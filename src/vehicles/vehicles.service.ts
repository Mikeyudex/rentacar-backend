import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Vehicle, VehicleDocument } from './vehicles.schema';
import { ApiResponse } from 'src/common/api-response';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectModel(Vehicle.name)
        private vehicleModel: Model<VehicleDocument>,
    ) { }

    async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
        try {
            const vehicles = await this.vehicleModel.find().exec();
            return ApiResponse.success('Success', vehicles);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async getVehicle(id: string): Promise<ApiResponse<Vehicle>> {
        try {
            let castedId = new Types.ObjectId(id);
            const vehicle = await this.vehicleModel.findById(id).exec();
            if (!vehicle) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el vehículo',
                    error: 'No se ha encontrado el vehículo',
                });
            }
            return ApiResponse.success('Success', vehicle);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async createVehicle(createVehicleDto: CreateVehicleDto): Promise<ApiResponse<Vehicle>> {
        try {
            const vehicle = new this.vehicleModel(createVehicleDto);
            const createdVehicle = await vehicle.save();
            return ApiResponse.success('Success', createdVehicle);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const vehicle = await this.vehicleModel.findById(castedId).exec();
            if (!vehicle) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el vehículo',
                    error: 'No se ha encontrado el vehículo',
                });
            }
            let updatedVehicle = await this.vehicleModel.findByIdAndUpdate(castedId, updateVehicleDto, { new: true }).exec();
            return ApiResponse.success('Success', updatedVehicle);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }

    }

    async deleteVehicle(id: string): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const vehicle = await this.vehicleModel.findByIdAndDelete(castedId).exec();
            return ApiResponse.success('Success', vehicle);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }
}
