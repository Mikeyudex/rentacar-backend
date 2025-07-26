import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../../utils/getUtcDate';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

export interface IUser {
    _id: Types.ObjectId;
    companyId: Types.ObjectId;
    email: string;
    phone: string;
    name: string;
    lastname: string;
    password: string;
    otp: string;
    secret: string;
    roleId: Types.ObjectId;
    active: boolean;
    activeOtp: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

@Schema()
export class User {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Company' })
    companyId: Types.ObjectId;

    @Prop({ required: true, unique: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    phone: string;

    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: false, type: String })
    lastname: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ required: false, default: '', type: String })
    otp: string;

    @Prop({ required: false, type:String, default: '' })
    secret: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'UserRole' })
    roleId: Types.ObjectId;

    @Prop({ required: false, type: Boolean, default: true })
    active: boolean;

    @Prop({ required: false, type: Boolean, default: false })
    activeOtp: boolean;

    @Prop({ required: false, type: String, default: null })
    resetPasswordToken?: string;

    @Prop({ required: false, default: null, type: Date })
    resetPasswordExpires?: Date;

    @Prop({ required: false, type: String })
    avatar?: string;

    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
