import { Provider } from '@nestjs/common';
import { AuthenService } from './services/authen.service';
import { AuthorService } from './services/author.service';
import { GoogleStrategy } from './strategies';

/**
 * Authentication service
 */
export const AUTHEN_SERVICES = Symbol('AUTHEN_SERVICES');

export const AuthenProvider: Provider = {
  provide: AUTHEN_SERVICES,
  useClass: AuthenService,
};

/**
 * Author service
 */
export const AUTHOR_SERVICES = Symbol('AUTHOR_SERVICES');

export const AuthorProvider: Provider = {
  provide: AUTHOR_SERVICES,
  useClass: AuthorService,
};

/**
 * Google strategy
 */
export const GOOGLE_STRATEGY = Symbol('GOOGLE_STRATEGY_PROVIDER');

export const GoogleStrategyProvider: Provider = {
  provide: GOOGLE_STRATEGY,
  useClass: GoogleStrategy,
};
