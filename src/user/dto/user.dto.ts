import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateUserDto {

    @IsNotEmpty()
    @IsMongoId()
    companyId: string | Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsMongoId()
    roleId: string | Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    avatar: string;
}

export class UpdateUserDto {

    @IsOptional()
    @IsMongoId()
    companyId: string | Types.ObjectId;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsMongoId()
    roleId: string | Types.ObjectId;

    @IsOptional()
    @IsBoolean()
    active: boolean;

    @IsOptional()
    @IsString()
    otp: string;

    @IsOptional()
    @IsString()
    secret: string;

    @IsOptional()
    @IsBoolean()
    activeOtp: boolean;

    @IsOptional()
    @IsString()
    resetPasswordToken?: string;

    @IsOptional()
    @IsString()
    resetPasswordExpires?: Date;

    @IsOptional()
    @IsString()
    avatar?: string;
}   