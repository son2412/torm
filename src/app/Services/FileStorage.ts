import * as multer from "multer";
import * as _ from "lodash";
import * as multerS3 from "multer-s3";
import * as aws from "aws-sdk";
import * as path from "path";
import * as stream from "stream";
import * as fileType from "file-type";
import isSvg from "is-svg";
import isPdf from "is-pdf";
import { Request } from "express";

export class FileStorage {
  storage_driver: string;
  folder: String;
  type: any;
  limit: number;
  header: boolean;
  constructor() {
    this.storage_driver = process.env.FILE_STORAGE;
    if (process.env.APP_ENV === "local") {
      this.folder = "src/uploads";
    } else {
      this.folder = "dist/uploads";
    }
    this.type = [];
    this.limit = 10;
    this.header = false;
  }

  destination(folder) {
    this.folder = folder;
    return this;
  }

  setStorageDriver(driver: string) {
    this.storage_driver = driver;
    return this;
  }

  typeFile(file) {
    this.type.push(file);
    return this;
  }

  limitFileUpload(num) {
    this.limit = num;
    return this;
  }

  setHeader(header) {
    this.header = header;
    return this;
  }

  setUpMulter() {
    let storage;
    const header = this.header;
    if (this.storage_driver === "s3") {
      storage = multerS3({
        s3: new aws.S3({
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY,
          region: process.env.S3_REGION
        }),
        bucket: process.env.S3_BUCKET_NAME,
        acl: "public-read",
        contentType: (req: Request, file, cb) => {
          file.stream.once("data", function(firstChunk) {
            var type = fileType(firstChunk);
            var mime;
            if (isSvg(firstChunk)) {
              mime = "image/svg+xml";
            } else if (header === true && isPdf(firstChunk)) {
              mime = "text/csv";
            } else {
              if (type) {
                mime = type.mime;
              } else {
                mime = "application/octet-stream";
              }
            }
            var outStream = new stream.PassThrough();
            outStream.write(firstChunk);
            file.stream.pipe(outStream);

            cb(null, mime, outStream);
          });
        },
        cacheControl: "max-age=31536000",
        key: function(req: Request, file, cb) {
          if (req.user_id) {
            cb(
              null,
              req.user_id +
                "/" +
                _.kebabCase(
                  path.basename(
                    file.originalname,
                    path.extname(file.originalname)
                  ) + Date.now()
                ) +
                path.extname(file.originalname)
            );
          } else {
            cb(
              null,
              _.kebabCase(
                path.basename(
                  file.originalname,
                  path.extname(file.originalname)
                ) + Date.now()
              ) + path.extname(file.originalname)
            );
          }
        }
      });
    } else {
      storage = multer.diskStorage({
        destination: this.folder,
        filename: function(res, file, cb) {
          cb(
            null,
            _.kebabCase(
              path.basename(file.originalname, path.extname(file.originalname))
            ) + path.extname(file.originalname)
          );
        }
      });
    }

    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        const extension = file.mimetype.split("/")[0];
        if (this.type.indexOf(extension) === -1) {
          return cb(new Error("type not accepted"), false);
        }
        cb(null, true);
      }
    });

    return upload;
  }

  /**
   * Create or update a record matching the attributes, and fill it with values
   *
   * @param name string
   *
   * @return callback
   */

  uploadSingleFile(name) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.setUpMulter().single(name));
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Create or update a record matching the attributes, and fill it with values
   *
   * @param name string
   *
   * @return callback
   */
  uploadMultiFile(name) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.setUpMulter().array(name, this.limit));
      } catch (e) {
        reject(e);
      }
    });
  }
}
