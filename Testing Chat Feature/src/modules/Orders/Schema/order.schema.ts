import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  serviceProviderId: Types.ObjectId; 

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  clientId: Types.ObjectId; 

  @Prop({ required: true, type: Boolean, default: false })
  taskStatus: boolean; 
}

export const OrderSchema = SchemaFactory.createForClass(Order);

