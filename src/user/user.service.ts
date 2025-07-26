import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { ApiResponse } from 'src/common/api-response';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async getAllUsers(): Promise<ApiResponse<UserDocument[]>> {
        try {
            const users = await this.userModel.find().exec();
            return ApiResponse.success('Success', users);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async getUser(id: string): Promise<ApiResponse<UserDocument>> {
        try {
            let castedId = new Types.ObjectId(id);
            const user = await this.userModel.findById(castedId).exec();
            if (!user) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el usuario',
                    error: 'No se ha encontrado el usuario',
                });
            }
            return ApiResponse.success('Success', user);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserDocument>> {
        try {
            const user = new this.userModel(createUserDto);
            const createdUser = await user.save();
            return ApiResponse.success('Success', createdUser);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const user = await this.userModel.findByIdAndUpdate(castedId, updateUserDto, { new: true }).exec();
            return ApiResponse.success('Success', user);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }

    }

    async deleteUser(id: string): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const user = await this.userModel.findByIdAndDelete(castedId).exec();
            return ApiResponse.success('Success', user);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async findByEmail(email: string): Promise<UserDocument> {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el usuario',
                    error: 'No se ha encontrado el usuario',
                });
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

}
