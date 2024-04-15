import { Injectable, Logger } from '@nestjs/common';
import {
  AuthorizeUserPayload,
  GoogleAuthorizedUserData,
  IAuthorService,
  UserInfoPayload,
} from '../interfaces';
import { PlatformType } from '../constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthorService implements IAuthorService {
  private readonly logger = new Logger(AuthorService.name);

  authorizeUser(payload: AuthorizeUserPayload) {
    const { type } = payload;

    switch (type) {
      case PlatformType.GOOGLE:
        break;
      case PlatformType.CREDENTIALS:
        break;
      default:
        break;
    }
  }

  async getUserInfo(payload: UserInfoPayload) {
    const { id, data, type } = payload;

    let ret: any;

    switch (type) {
      case PlatformType.GOOGLE:
        ret = await this.getGoogleUserInfo(data, id);
        break;
      default:
        this.logger.error(`[GET-USER-INFO]: unsupported platform by ${type}`);
        throw new Error('Unsupported platform');
    }

    return ret;
  }

  /**
   * We can look for images, other information if we have a schema for them
   * @param data
   * @param id
   * @returns
   */
  private async getGoogleUserInfo(data: GoogleAuthorizedUserData, id: string) {
    return {
      ...data,
      id,
    };
  }

  generateToken(data: { username: string; email: string }) {
    const { username, email } = data;

    return jwt.sign({ username, email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
