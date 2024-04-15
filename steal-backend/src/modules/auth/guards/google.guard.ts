import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
    });
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const request = this.getRequest(context);

    const state = this.getStateOptions(request);

    return {
      state,
    };
  }

  getStateOptions(request: Request) {
    const queries = request.query;

    return Buffer.from(JSON.stringify(queries)).toString('base64');
  }
}
