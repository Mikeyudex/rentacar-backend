import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsString()
    apellidos: string;

    @IsNotEmpty()
    @IsString()
    rut: string;

    @IsNotEmpty()
    @IsString()
    direccion: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;
    
    @IsOptional()
    @IsString()
    fotoCi: string;

    @IsOptional()
    @IsString()
    hojaAntecedentes: string;

    @IsOptional()
    @IsString()
    hojaConductor: string;

    @IsOptional()
    @IsString()
    eRut: string;

    @IsOptional()
    @IsString()
    contratoUrl: string;
}

export class UpdateCustomerDto {

    @IsOptional()
    @IsString()
    nombres: string;

    @IsOptional()
    @IsString()
    apellidos: string;

    @IsOptional()
    @IsString()
    rut: string;

    @IsOptional()
    @IsString()
    direccion: string;  

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    telefono: string;

    @IsOptional()
    @IsString()
    fotoCi: string;

    @IsOptional()
    @IsString()
    fotoLicencia: string;

    @IsOptional()
    @IsString()
    eRut: string;

    @IsOptional()
    @IsString()
    contratoUrl: string;

    @IsOptional()
    @IsString()
    hojaAntecedentes: string;

    @IsOptional()
    @IsString()
    hojaConductor: string;

}

