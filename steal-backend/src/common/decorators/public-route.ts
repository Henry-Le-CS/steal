import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const PublicRoute = (isPublic?: boolean) => {
  if (isPublic === undefined) {
    isPublic = true;
  }

  return SetMetadata(IS_PUBLIC_KEY, isPublic);
};
