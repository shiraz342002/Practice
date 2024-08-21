import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @ApiProperty({ description: 'ID of the reviewer' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  reviewerId: Types.ObjectId;

  @ApiProperty({ description: 'ID of the reviewee (person being reviewed)' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  revieweeId: Types.ObjectId;

  @ApiProperty({ description: 'Rating given by the reviewer', example: 4 })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @ApiProperty({ description: 'Review text' })
  @Prop({ type: String, required: true })
  text: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
