import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomGet, PublicRoute } from './common/decorators';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @CustomGet()
  @ApiOperation({
    description: 'Get Hello World',
  })
  @PublicRoute()
  getHello(): string {
    return this.appService.getHello();
  }

  @CustomGet('test-private')
  @ApiOperation({
    description: 'Test private API when logged in',
  })
  getTestPrivate(): string {
    return 'Test Private';
  }
}
