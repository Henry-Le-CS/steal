import {
  Controller,
  Inject,
  Logger,
  Param,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google.guard';
import { Request as Req, Response as Res } from 'express';
import { ICustomRequest } from './interfaces';
import { ApiTags } from '@nestjs/swagger';
import { CustomGet, CustomPost } from 'src/common/decorators';
import { AUTHOR_SERVICES } from './auth.provider';
import { AuthorService } from './services/author.service';
import { PlatformType } from './constants';

/**
 * AuthController
 * TODO: use :platform to replace google if we need more social login
 */
@ApiTags('Auth')
@Controller('auth-service')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    @Inject(AUTHOR_SERVICES) private readonly authorService: AuthorService,
  ) {}

  /** =============== LOG IN =================== */
  @CustomGet({
    path: 'google/login',
    description: 'Login with google',
    isPublic: true,
  })
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line
  async loginWithGoogle(@Request() req: Req) {}

  /** ================ AUTHORIZE ================== */

  @CustomGet({
    path: 'google/authorize',
    description: "Handle authorized request from google's callback url",
    isPublic: true,
  })
  @UseGuards(GoogleOAuthGuard)
  handleAuthorizedRequest(
    @Request()
    req: ICustomRequest,
    @Response() res: Res,
    @Query('state') state: string,
  ) {
    try {
      const { user } = req;

      if (!user) {
        throw new Error('Missing user data for authorization');
      }

      req.session.user = user;

      // Save session to store
      req.session.save((err) => {
        if (err) {
          throw new Error(
            `Failed to save session by exception ${err?.message || err}`,
          );
        }
      });

      const queries = JSON.parse(this.parseBase64Query(state));
      const { callback } = queries;

      if (!callback) {
        throw new Error('Missing callback url');
      }

      // Redirect to url from UI
      res.redirect(JSON.parse(callback));
    } catch (err) {
      this.logger.error(err?.message || 'Bad request');

      res.status(400).send({
        data: err?.message || 'Bad request',
      });
    }
  }

  /** ================ USER INFORMATION ================== */
  @CustomGet({
    path: ':platform/me',
    description: 'Get user information from certain platform',
  })
  async handleGetUserInfo(
    @Request() req: ICustomRequest,
    @Response() res: Res,
    @Param('platform') platform: string,
  ) {
    try {
      const { session } = req;
      const { user, id } = session;

      const data = await this.authorService.getUserInfo({
        type: platform as PlatformType,
        data: user,
        id,
      });

      res.status(200).send({ data });
    } catch (err) {
      this.logger.error(err?.message || 'Bad request');

      res.status(400).send({
        data: err?.message || 'Bad request',
      });
    }
  }

  /** =============== LOG OUT =================== */
  @CustomPost({
    path: ':platform/logout',
    description: 'Logout from certain platform',
  })
  logoutWithGoogle(@Request() req: Req, @Response() res: Res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error(
            `Failed to destroy session by exception ${err?.message || err}`,
          );
        }
      });

      const host = req.get('host');
      const protocal = req.protocol;

      res.redirect(`${protocal}://${host}`);
    } catch (err) {
      this.logger.error(err?.message || 'Bad request');

      res.status(400).send({
        data: err?.message || 'Bad request',
      });
    }
  }

  /** ================ HELPER ================== */

  /**
   * Parse base64 string
   * @param query
   * @returns
   */
  private parseBase64Query(query: string) {
    return Buffer.from(query, 'base64').toString('utf-8');
  }
}
