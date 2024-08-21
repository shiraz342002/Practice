import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsService } from './review.service';
import { ReviewsController } from './review.controller';
import { Review, ReviewSchema } from './schema/review.schema';

import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  UserModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService]
})
export class ReviewsModule {}
