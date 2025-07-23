import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserRole, UserRoleDocument } from "../schemas/user-role.schema";
import { ApiResponse } from "src/common/api-response";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserRoleDto, UpdateUserRoleDto } from "../dto/user-role.dto";

@Injectable()
export class UserRoleService {

    constructor(
        @InjectModel(UserRole.name)
        private userRoleModel: Model<UserRoleDocument>,
    ) { }

    async getAllUserRoles(): Promise<ApiResponse<UserRoleDocument[]>> {
        try {
            const userRoles = await this.userRoleModel.find().exec();
            return ApiResponse.success('Success', userRoles);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async getUserRole(id: string): Promise<ApiResponse<UserRoleDocument>> {
        try {
            let castedId = new Types.ObjectId(id);
            const userRole = await this.userRoleModel.findById(castedId).exec();
            if (!userRole) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el usuario',
                    error: 'No se ha encontrado el usuario',
                });
            }
            return ApiResponse.success('Success', userRole);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async createUserRole(createUserRoleDto: CreateUserRoleDto): Promise<ApiResponse<UserRoleDocument>> {
        try {
            const userRole = new this.userRoleModel(createUserRoleDto);
            const createdUserRole = await userRole.save();
            return ApiResponse.success('Success', createdUserRole);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const userRole = await this.userRoleModel.findByIdAndUpdate(castedId, updateUserRoleDto, { new: true }).exec();
            return ApiResponse.success('Success', userRole);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }

    }

    async deleteUserRole(id: string): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const userRole = await this.userRoleModel.findByIdAndDelete(castedId).exec();
            return ApiResponse.success('Success', userRole);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }
}