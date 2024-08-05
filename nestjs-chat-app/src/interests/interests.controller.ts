import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('interests')
export class InterestsController {

    constructor(private readonly interestsService: InterestsService) { }

    @Post('seed')
    @ApiOperation({ summary: 'Seed interests into the database' })
    @ApiBody({
      description: 'Array of interests to be seeded',
      type: [String],
    })
    async seed(@Body() body: { interests: string[] }) {
      const { interests } = body;
  
      if (!Array.isArray(interests) || !interests.every(item => typeof item === 'string')) {
        throw new BadRequestException('Interests must be an array of strings');
      }
  
      return await this.interestsService.bulkInsert(interests);
    }
    @Get()
    findOne() {
        return this.interestsService.getAll();
    }
}
