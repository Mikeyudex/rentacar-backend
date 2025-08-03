import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentUTCDate } from '../utils/getUtcDate';
import { Document, Types } from 'mongoose';

export type ControlDocumentalDocument = ControlDocumental & Document;

@Schema()
export class ControlDocumental {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Vehicle' })
    vehicleId: Types.ObjectId;

    @Prop({ required: false, type: String })
    padron: string;

    @Prop({ required: false, type: String })
    permisoCirculacionFile: string;

    @Prop({ required: false, type: Date })
    permisoCirculacionExpiracion: Date;

    @Prop({ required: false, type: String })
    revisionTecnicaFile: string;

    @Prop({ required: false, type: Date })
    revisionTecnicaExpiracion: Date;

    @Prop({ required: false, type: String })
    seguroObligatorioFile: string;

    @Prop({ required: false, type: Date })
    seguroObligatorioExpiracion: Date;

    @Prop({ required: false, type: String })
    seguroGeneralFile: string;
    
    @Prop({ default: () => getCurrentUTCDate() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const ControlDocumentalSchema = SchemaFactory.createForClass(ControlDocumental);