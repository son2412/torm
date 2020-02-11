import { Request, Response, Router } from "express";
import { FileStorage } from "../../../app/Services/FileStorage";
import { AuthMiddleware } from "../../../app/Middleware/AuthMiddleware";
const router = Router();

router.all("*", AuthMiddleware);
router.post("/s3", uploadS3);
router.post("/server", upload);
async function uploadS3(req: Request, res: Response) {
  const service = new FileStorage();

  const upload: any = await service
    .typeFile("image")
    .typeFile("video")
    .typeFile("application")
    .limitFileUpload(5)
    .uploadMultiFile("files");

  upload(req, res, function(error) {
    if (error) {
      res.status(500);
      res.json({ data: error.message, error_code: 1000 });
    } else {
      res.json(req.files);
    }
  });
}

async function upload(req: Request, res: Response) {
  const service = new FileStorage();

  const upload: any = await service
    .typeFile("image")
    .setStorageDriver("local")
    .limitFileUpload(5)
    .uploadSingleFile("file");

  upload(req, res, function(error) {
    if (error) {
      res.status(500);
      res.json({ data: error.message, error_code: 1000 });
    } else {
      res.json(req.file);
    }
  });
}

export default router;
