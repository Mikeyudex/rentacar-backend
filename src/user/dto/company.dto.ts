import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateCompanyDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}

export class UpdateCompanyDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    code: string;
}