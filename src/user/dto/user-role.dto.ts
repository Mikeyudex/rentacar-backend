import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateUserRoleDto {

    @IsNotEmpty()
    @IsMongoId()
    companyId: string | Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateUserRoleDto {

    @IsOptional()
    @IsMongoId()
    companyId: string | Types.ObjectId;

    @IsOptional()
    @IsString()
    name: string;
}