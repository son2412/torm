import { Request, Response } from 'express';
import { AuthService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/index';
import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { InvalidInput } from '@const/error';

export class AuthController {
  async signIn(req: Request, res: Response) {
    const valid = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(AuthService).login(value);
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async signUp(req: Request, res: Response) {
    const { body } = req;
    try {
      const result = await new AuthService().register({ ...body, ...{ status: 1 } });
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async signInWithFacebook(req: Request, res: Response) {
    const valid = Joi.object({
      id: Joi.string().required(),
      token: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(AuthService).signInFacebook(value);
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async signInWithGoogle(req: Request, res: Response) {
    const valid = Joi.object({
      token: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));
    try {
      const result = await App.make(AuthService).signInGoogle(value.token);
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async signInWithTwitter(req: Request, res: Response) {
    const valid = Joi.object({
      oauth_token: Joi.string().required(),
      oauth_token_secret: Joi.string().required(),
      oauth_verifier: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));
    try {
      const result = await App.make(AuthService).signInTwitter(value);
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }
}
