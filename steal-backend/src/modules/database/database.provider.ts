import { Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';

export const DATABASE_SERVICES = Symbol('DATABASE_SERVICES');

export const DatabaseProvider: Provider = {
  provide: DATABASE_SERVICES,
  useClass: DatabaseService,
};
