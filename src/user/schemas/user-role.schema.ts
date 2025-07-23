
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../../utils/getUtcDate';
import { Document, Types } from 'mongoose';

export type UserRoleDocument = UserRole & Document;

@Schema()
export class UserRole {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Company' })
    companyId: Types.ObjectId;

    @Prop({ required: true, unique: true, type: String })
    name: string;

    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
