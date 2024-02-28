import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create')
  async createDeployment(@Body('gitUrl') gitUrl: string) {
    return this.appService.createDeployment({ gitUrl });
  }
}
