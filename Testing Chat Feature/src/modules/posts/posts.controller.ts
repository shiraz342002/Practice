import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { constTexts } from "../../constants";
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostEntity } from "./schema/post.schema";
import { User } from "../user/schema/user.schema";
import { ApiPageOkResponse, Auth, AuthUser } from "src/decorators";
import { Action } from "src/casl/userRoles";
import { UpdatePostDto } from "./dto/posts-update.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptionsPostImages } from "src/configuration/multer.config";
import { CreatePostDto } from "./dto/create.post.dto";
@Controller(constTexts.postRoute.name)
@ApiTags(constTexts.postRoute.name)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @Auth(Action.Create, "Post")
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  @ApiBody({
    description: 'Post creation data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        streetAddress: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' },
        state: { type: 'string' },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images', 10, multerOptionsPostImages))
  async create(
    @AuthUser() user: User,
    @Body() createDto: CreatePostDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    if (images) {
      createDto.images = images.map(file => file.path);
    }
    createDto.userId = user.id;
    const post = await this.postsService.create(createDto);
    return post;
  }



  @Get()
  @ApiPageOkResponse({
    description: "Get all List",
    type: PostEntity,
  })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findall(@Query("page") page = 1, @Query("limit") limit = 20) {
    return this.postsService.findall(page, limit);
  }

  @Patch(constTexts.postRoute.update)
  @Auth(Action.Update, "Post")
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Post Updated successfully.' })
  @ApiBody({
    description: 'Post Updation data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'string' },
        location: {
          type: 'object',
          properties: {
            type: { type: 'string', example: 'Point' },
            coordinates: {
              type: 'array',
              items: { type: 'number' },
              example: [40.7128, -74.0060],
            },
          },
          example: {
            "type": "Point",
            "coordinates": [
              -122.4194,  // Longitude
              37.7749     // Latitude
            ]
          },
        },
        isUrgent: { type: 'boolean' },
        isHelpFree: { type: 'boolean' },
        obo: { type: 'boolean' },
        streetAddress: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' },
        state: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images', 10, multerOptionsPostImages))
  async update(
    @Param('id') id: string,
    @Body() updateDataDto: UpdatePostDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    if (images) {
      updateDataDto.images = images.map(file => file.path);
    } else {
      updateDataDto.images = [];
    }
    if (updateDataDto.location && typeof updateDataDto.location === 'string') {
      try {
        updateDataDto.location = JSON.parse(updateDataDto.location);
      } catch (error) {
        console.error("Invalid location format:", updateDataDto.location);
      }
    }
    const result = await this.postsService.update(id, updateDataDto);
    return result;
  }

  @Delete(constTexts.postRoute.delete)
  @ApiPageOkResponse({
    description: "Update Post",
    type: PostEntity,
  })
  @Auth(Action.Delete, "Post")
  async deletePost(@Param("id") id: string) {
    return this.postsService.deletePost(id);
  }

  @Get(constTexts.postRoute.viewOtherPosts)
  @ApiPageOkResponse({
    description: "View Other User Specefic Post",
    type: User,
  })
  @Auth(Action.Read, "User") 
  async viewOtherUserPost(
    @Param('id') id: string, 
    @AuthUser() user: User 
  ): Promise<PostEntity> {
    return this.postsService.viewOtherUserPost(id);
  }

  @Get(constTexts.postRoute.viewMyAds)
  @ApiPageOkResponse({
    description: "View Users Ads/Posts",
    type: PostEntity,
  })
  @Auth(Action.Read, "User") 
  async viewMyAds(
    @AuthUser() user: User 
  ): Promise<PostEntity[]> {
    return this.postsService.viewMyAds(user.id);
  }

}
