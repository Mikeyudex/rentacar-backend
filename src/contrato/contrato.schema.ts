import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../utils/getUtcDate';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Contrato & Document;

export enum ModoPago {
    MENSUAL = 'mensual',
    QUINCENAL = 'quincenal',
}

export interface IContrato {
    customerId: Types.ObjectId;
    contratoUrl: string;
    montoArriendo: number;
    montoGarantia: number;
    modoPago: ModoPago;
}

@Schema()
export class Contrato {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
    customerId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Vehicle' })
    vehicleId: Types.ObjectId;

    @Prop({ required: true, type: String })
    contratoUrl: string;

    @Prop({ required: true, type: Number })
    montoArriendo: number;

    @Prop({ required: true, type: Number })
    montoGarantia: number;

    @Prop({ required: true, type: String })
    modoPago: string;

    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const ContratoSchema = SchemaFactory.createForClass(Contrato);
