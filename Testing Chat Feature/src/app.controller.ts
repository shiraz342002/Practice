import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  findOne() {
    return { message: 'Hello world!' };
  }
}
