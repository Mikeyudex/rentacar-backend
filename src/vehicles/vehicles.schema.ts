import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../utils/getUtcDate';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {

    @Prop({ required: false, type: String })
    companyId?: string;

    @Prop({ required: true, type: String })
    patente: string;

    @Prop({ required: true, type: String })
    marca: string;

    @Prop({ required: true, type: String })
    modelo: string;

    @Prop({ required: true, type: String })
    numMotor: string;

    @Prop({ required: true, type: String })
    numVin: string;

    @Prop({ required: true, type: String })
    color: string;

    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
