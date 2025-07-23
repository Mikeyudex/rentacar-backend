import {
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateVehicleDto {
    
    @IsOptional()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    patente: string;

    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNotEmpty()
    @IsString()
    modelo: string;

    @IsNotEmpty()
    @IsString()
    numMotor: string;

    @IsNotEmpty()
    @IsString()
    numVin: string;

    @IsNotEmpty()
    @IsString()
    color: string;
}

export class UpdateVehicleDto {

    @IsOptional()
    @IsString()
    companyId: string;

    @IsOptional()
    @IsString()
    patente: string;

    @IsOptional()
    @IsString()
    marca: string;

    @IsOptional()
    @IsString()
    modelo: string;

    @IsOptional()
    @IsString()
    numMotor: string;

    @IsOptional()
    @IsString()
    numVin: string;

    @IsOptional()
    @IsString()
    color: string;
}   