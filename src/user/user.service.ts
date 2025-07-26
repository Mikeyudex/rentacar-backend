import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { ApiResponse } from 'src/common/api-response';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { IUserResponse } from './interfaces/user-response.interface';


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

    async createUser(createUserDto: CreateUserDto): Promise<ApiResponse<IUserResponse>> {
        try {
            const user = new this.userModel(createUserDto);
            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword;
            const createdUser = await user.save();
            let mapUser: IUserResponse = {
                _id: createdUser._id!.toString(),
                companyId: createdUser.companyId.toString(),
                email: createdUser.email,
                phone: createdUser.phone,
                name: createdUser.name,
                lastname: createdUser.lastname,
                roleId: createdUser.roleId.toString(),
                active: createdUser.active,
                avatar: createdUser?.avatar || '',
                createdAt: createdUser.createdAt ? createdUser.createdAt.toString() : '',
            }
            return ApiResponse.success('Success', mapUser);
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
