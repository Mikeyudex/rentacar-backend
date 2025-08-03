import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateControlDocumentalDto {
    @IsNotEmpty()
    @IsString()
    vehicleId: string | Types.ObjectId;

    @IsOptional()
    @IsString()
    padron: string;

    @IsOptional()
    @IsString()
    permisoCirculacionFile: string;

    @IsOptional()
    @IsString()
    permisoCirculacionExpiracion: string | Date;

    @IsOptional()
    @IsString()
    revisionTecnicaFile: string;

    @IsOptional()
    @IsString()
    revisionTecnicaExpiracion: string | Date;

    @IsOptional()
    @IsString()
    seguroObligatorioFile: string;

    @IsOptional()
    @IsString()
    seguroObligatorioExpiracion: string | Date;

    @IsOptional()    
    seguroGeneralFile: string;

}

export class UpdateControlDocumentalDto {

}