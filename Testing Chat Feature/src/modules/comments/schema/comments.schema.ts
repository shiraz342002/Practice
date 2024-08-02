import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @IsString()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @IsString()
  @ApiProperty()
  @Prop({ type: String, required: true })
  content: string;

  @ApiProperty({ type: [mongoose.Schema.Types.ObjectId], description: 'Replies to the comment' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], default: [] })
  replies: mongoose.Schema.Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
