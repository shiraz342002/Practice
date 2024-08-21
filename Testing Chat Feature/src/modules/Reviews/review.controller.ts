import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './Dto/create.review.dto';
import { Auth, AuthUser } from 'src/decorators';
import { User } from 'src/modules/user/schema/user.schema';
import { Action } from 'src/casl/userRoles';
import { Review } from './schema/review.schema';
import { constTexts } from 'src/constants';

@Controller(constTexts.reviewsRoute.name)
@ApiTags(constTexts.reviewsRoute.name)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(constTexts.reviewsRoute.PostReview)
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({ status: 201, description: 'Review created successfully.', type: Review })
  @Auth(Action.Create, "Review")
  async create(
    @Param('revieweeId') revieweeId: string,
    @Body() createReviewDto: CreateReviewDto,
    @AuthUser() user: User,
  ) {
    return this.reviewsService.create(user.id,revieweeId,createReviewDto);
  }

  @Get(':revieweeId')
  @ApiOperation({ summary: 'Get reviews by reviewee ID' })
  @ApiResponse({ status: 200, description: 'Reviews fetched successfully.', type: [Review] })
  async findByRevieweeId(@Param('revieweeId') revieweeId: string) {
    return this.reviewsService.findByRevieweeId(revieweeId);
  }
}
