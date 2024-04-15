import { Request } from 'express';
import { PlatformType } from '../constants';
import { ResponseData } from 'src/common/types';

export interface IAuthorService {
  authorizeUser(payload: AuthorizeUserPayload): void;
  getUserInfo(payload: UserInfoPayload): Promise<ResponseData>;
}

export type AuthorizeUserPayload = GoogleAuthorizeUserPayload | any;

export type UserInfoPayload = GoogleUserInfoPayload & {
  id: string; // session id
};

export type GoogleAuthorizedUserData = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
};

export type GoogleAuthorizeUserPayload = {
  type: PlatformType.GOOGLE;
  data: GoogleAuthorizedUserData;
};

export type GoogleUserInfoPayload = {
  type: PlatformType.GOOGLE;
  data: GoogleAuthorizedUserData;
};

declare module 'express-session' {
  interface SessionData {
    user: GoogleAuthorizedUserData;
  }
}

export interface ICustomRequest extends Request {
  user: GoogleAuthorizedUserData;
}
