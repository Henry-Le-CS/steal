import { Delete, Get, Post, Put, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PublicRoute } from './public-route';
import {
  isNil,
  isString,
  isUndefined,
} from '@nestjs/common/utils/shared.utils';

type Path = string | undefined;

type CustomDecorator = {
  path?: Path;
  description?: string;
  isPublic?: boolean;
};

type RestDecoratorOptions = CustomDecorator | Path;

const getListDecorators = (
  options: CustomDecorator,
): Array<ClassDecorator | MethodDecorator | PropertyDecorator> => {
  const ret = [];

  for (const [key, value] of Object.entries(options)) {
    switch (key) {
      case 'description': {
        if (!isString(value)) break;

        ret.push(ApiOperation({ description: value }));
        break;
      }
      case 'isPublic': {
        if (isNil(value) || isUndefined(value)) break;

        ret.push(PublicRoute(<boolean>value));
        break;
      }
      default:
        break;
    }
  }

  return ret;
};

export const CustomPost = (options?: RestDecoratorOptions) => {
  if (typeof options === 'string' || typeof options === 'undefined') {
    return applyDecorators(Post(options));
  }

  const { path } = options;

  const decorators = getListDecorators(options);
  return applyDecorators(Post(path), ...decorators);
};

export const CustomGet = (options?: RestDecoratorOptions) => {
  if (typeof options == 'string' || typeof options === 'undefined') {
    return applyDecorators(Get(options));
  }

  const { path } = options;

  const decorators = getListDecorators(options);
  return applyDecorators(Get(path || '/'), ...decorators);
};

export const CustomPut = (options?: RestDecoratorOptions) => {
  if (typeof options === 'string' || typeof options === 'undefined') {
    return applyDecorators(Put(options));
  }

  const { path } = options;

  const decorators = getListDecorators(options);
  return applyDecorators(Put(path), ...decorators);
};

export const CustomDelete = (options?: RestDecoratorOptions) => {
  if (typeof options === 'string' || typeof options === 'undefined') {
    return applyDecorators(Delete(options));
  }

  const { path } = options;

  const decorators = getListDecorators(options);
  return applyDecorators(Delete(path), ...decorators);
};
