import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../utils/getUtcDate';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

    @Prop({ required: true, type: String })
    nombres: string;

    @Prop({ required: true, type: String })
    apellidos: string;

    @Prop({ required: true, type: String, unique: true })
    rut: string;

    @Prop({ required: true, type: String })
    direccion: string;

    @Prop({ required: true, type: String, unique: true })
    email: string;

    @Prop({ required: true, type: String, unique: true })
    telefono: string;

    @Prop({ required: false, type: String })
    fotoCi: string;

    @Prop({ required: false, type: String })
    fotoLicencia: string;

    @Prop({ required: false, type: String })
    hojaAntecedentes: string;

    @Prop({ required: false, type: String })
    hojaConductor: string;

    @Prop({ required: false, type: String })
    eRut: string;

    @Prop({ required: true, type: String })
    contratoUrl: string;

    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
