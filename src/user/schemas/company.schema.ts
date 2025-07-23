import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../../utils/getUtcDate';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {

    @Prop({ required: true, unique: true, type: String })
    name: string;

    @Prop({ required: true, unique: true, type: String })
    code: string;

    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
