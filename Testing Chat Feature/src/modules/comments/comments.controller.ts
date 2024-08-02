import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { constTexts } from "src/constants/constants-routes";
import { CommentsService } from "./comments.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action } from "src/casl/userRoles";
import { Auth, AuthUser } from "src/decorators";
import { User } from "../user/user.schema";
import { CommentDto, UpdateCommentDto } from "./Dto/comments.dto";

@Controller(constTexts.commentRoute.name)
@ApiTags(constTexts.commentRoute.name)


export class CommentController {
constructor(private readonly commentService: CommentsService) { }
 @Post(constTexts.commentRoute.Add)
 @ApiOperation({ summary: 'Add a comment to a post' })
 @ApiResponse({ status: 201, description: 'Comment added successfully' })
 @ApiResponse({ status: 400, description: 'Invalid input' })
 @Auth(Action.Create, 'User')
 async addComment(
    @Param('postId') postId: string,
    @Body() commentDto: CommentDto,
    @AuthUser() user: User
 ):Promise<any>{
    const { content } = commentDto;
    if (!content || typeof content !== 'string') {
        throw new HttpException('Invalid comment content', HttpStatus.BAD_REQUEST);
      }
      try {
       await this.commentService.addComment(postId, user.id, content);
        return { message: 'Comment added successfully' };
      } catch (error) {
        throw new HttpException('Unable to add comment', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  @Post(constTexts.commentRoute.Reply)
  @ApiOperation({ summary: 'Add a Reply to a Coment' })
  @ApiResponse({ status: 201, description: 'Reply added successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Auth(Action.Create, 'User')
  async addReply(
    @Param('comentId') comentId: string,
    @Body() commentDto: CommentDto,
    @AuthUser() user: any
  ):Promise<any>{
    const { content } = commentDto;
    if (!content || typeof content !== 'string') {
        throw new HttpException('Invalid Reply content', HttpStatus.BAD_REQUEST);
      }
    try {
       await this.commentService.replyComment(comentId, user.id, content);
       return { message: 'Reply added successfully' };
     } catch (error) {
      //  console.error('Error adding Reply:', error);
       throw new HttpException('Unable to add Reply', HttpStatus.INTERNAL_SERVER_ERROR);
     }
  }

  @ApiOperation({ summary: 'View Comment With Replies' })
  @ApiResponse({ status: 201, description: 'Comment Retrived successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Auth(Action.Read, 'User')
  @Get(constTexts.commentRoute.getCommentWithReplies)
  async getCommentWithReplies(@Param('commentId') commentId: string) {
    return this.commentService.getCommentWithReplies(commentId);
  }

  @ApiOperation({ summary: 'View Post Comments and Replies' })
  @ApiResponse({ status: 201, description: 'Post Comments Retrived successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Auth(Action.Read, 'User')
  @Get(constTexts.commentRoute.getPostCommentsWithReplies)
  async getPostCommentsWithReplies(@Param('postId') postId: string) {
    return this.commentService.getPostCommentsWithReplies(postId);
  }
  
  @ApiOperation({ summary: 'Edit Your Comments' })
  @ApiResponse({ status: 201, description: 'Comments Edited successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Auth(Action.Read, 'User')
  @Patch(constTexts.commentRoute.update)
  @Auth(Action.Update, 'User')
  async updateComment(
    @Param('commentId')commentId:string,
    @Body()commentdto:UpdateCommentDto
  ):Promise<any>{
    return this.commentService.updateComment(commentId,commentdto)
  }

  @ApiOperation({ summary: 'Delete Your Comments' })
  @ApiResponse({ status: 201, description: 'Comments Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Auth(Action.Read, 'User')
  @Delete(constTexts.commentRoute.delete)
  @Auth(Action.Update, 'User')
  async deleteComment(
    @Param('commentId')commentId:string,
  ):Promise<any>{
    return this.commentService.deleteComment(commentId)
  }

  @ApiOperation({ summary: 'View Post Comments Only' })
  @ApiResponse({ status: 201, description: 'Post Comments Retrived successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Auth(Action.Read, 'User')
  @Get(constTexts.commentRoute.getPostComments)
  async getPostComments(@Param('postId') postId: string) {
    return this.commentService.getOnlyCommentsByPostId(postId);
  }


}