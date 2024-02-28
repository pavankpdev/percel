import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create')
  async createDeployment(@Body() payload: CreateDeploymentDto) {
    return this.appService.createDeployment(payload);
  }
}
