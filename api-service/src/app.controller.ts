import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log({
      level: 'info',
      message: `User created successfully - user.id`,
    });
    return this.appService.getHello();
  }

  @Post('/create')
  async createDeployment(@Body() payload: CreateDeploymentDto) {
    this.logger.log({
      level: '1',
      message: `User created successfully - user.id`,
    });
    console.log({
      level: '1',
      message: "Yo, I'm coming from the server from console lol",
    });
    return this.appService.createDeployment(payload);
  }
}

// p: rDOF*4U-FKyjtoNfzzQC
// u: elastic
// HTTP CA certificate SHA-256 fingerprint:
//   bb82ea65e39ac87d5b2aded4a8bcea233c64fa5fefdf81a8f9546f1ae456dae1
