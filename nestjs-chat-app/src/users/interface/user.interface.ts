import { Document } from 'mongoose';
import { Interest } from 'src/interests/schemas/interest.schema';

export interface User extends Document {
    _id: string; 
    name: string;
    username: string;
    email: string;
    password: string;
    password_key: string;
    about?: string;
    birthday?: Date;
    height?: number;
    weight?: number;
    interests?: Interest[];
}
