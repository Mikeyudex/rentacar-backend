import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Vehicle, VehicleDocument } from './vehicles.schema';
import { ApiResponse } from 'src/common/api-response';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated.interface';
import { VehicleResponse } from 'src/common/interfaces/vehicle-response';

interface GetVehiclesParams {
    page: number
    limit: number
    search?: string
    marca?: string
    color?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

@Injectable()
export class VehiclesService {
    constructor(
        @InjectModel(Vehicle.name)
        private vehicleModel: Model<VehicleDocument>,
    ) { }

    async getVehicles(params: GetVehiclesParams): Promise<PaginatedResponse<Vehicle>> {
        try {
            const { page, limit, search, marca, color, sortBy = 'patente', sortOrder = 'asc' } = params;

            const filters: any = {};

            // Búsqueda general (en varias propiedades)
            if (search) {
                const regex = new RegExp(search, 'i');
                filters.$or = [
                    { patente: regex },
                    { marca: regex },
                    { modelo: regex },
                    { color: regex },
                ];
            }

            if (marca) {
                filters.marca = new RegExp(marca, 'i');
            }

            if (color) {
                filters.color = new RegExp(color, 'i');
            }

            const totalItems = await this.vehicleModel.countDocuments(filters);

            const vehicles = await this.vehicleModel
                .find(filters)
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();

            const totalPages = Math.ceil(totalItems / limit);

            return {
                data: vehicles,
                meta: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    itemsPerPage: limit,
                },
            };
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
            // Validar ObjectId
            if (!Types.ObjectId.isValid(castedId)) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'ID inválido',
                    error: 'El ID proporcionado no es válido',
                });
            }

            const vehicle = await this.vehicleModel.findById(id).exec();

            if (!vehicle) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el vehículo',
                    error: 'No se ha encontrado el vehículo',
                });
            }

            return ApiResponse.success('Vehículo encontrado', vehicle);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async createVehicle(createVehicleDto: CreateVehicleDto): Promise<ApiResponse<VehicleResponse>> {
        try {
            const { patente, numMotor, numVin } = createVehicleDto;

            // Validar que no exista otra patente, numMotor o numVin
            const exists = await this.vehicleModel.findOne({
                $or: [
                    { patente: patente.toUpperCase() },
                    { numMotor: numMotor.toUpperCase() },
                    { numVin: numVin.toUpperCase() },
                ],
            });

            if (exists) {
                let duplicatedField = "";

                if (exists.patente === patente.toUpperCase()) duplicatedField = "patente";
                else if (exists.numMotor === numMotor.toUpperCase()) duplicatedField = "número de motor";
                else if (exists.numVin === numVin.toUpperCase()) duplicatedField = "número VIN";

                throw new BadRequestException({
                    statusCode: 400,
                    message: `Ya existe un vehículo con este ${duplicatedField}`,
                });
            }

            // Normalizar y guardar
            const vehicle = new this.vehicleModel({
                ...createVehicleDto,
                patente: patente.toUpperCase(),
                numMotor: numMotor.toUpperCase(),
                numVin: numVin.toUpperCase(),
                marca: createVehicleDto.marca.trim(),
                modelo: createVehicleDto.modelo.trim(),
                color: createVehicleDto.color.trim(),
            });

            const createdVehicle = await vehicle.save();

            let mapVehicle: VehicleResponse = {
                ...createdVehicle.toObject(),
                id: createdVehicle._id!.toString(),
                companyId: createdVehicle.companyId!.toString(),
                createdAt: createdVehicle.createdAt!,
                updatedAt: createdVehicle.updatedAt!,
            };

            return ApiResponse.success("Vehículo creado exitosamente", mapVehicle);
        } catch (error) {
            if (error instanceof BadRequestException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: "Error interno del servidor",
                error: error.message || "Unknown error",
            });
        }
    }

    async updateVehicle(id: string, dto: UpdateVehicleDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            if (!Types.ObjectId.isValid(castedId)) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: "ID inválido",
                    error: "El ID proporcionado no es válido",
                });
            }

            const vehicle = await this.vehicleModel.findById(id).exec();
            if (!vehicle) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: "No se ha encontrado el vehículo",
                    error: "No se ha encontrado el vehículo",
                });
            }

            // Normalizar datos
            const updatedData: Partial<Vehicle> = {
                ...dto,
                patente: dto.patente?.toUpperCase(),
                marca: dto.marca?.trim(),
                modelo: dto.modelo?.trim(),
                numMotor: dto.numMotor?.toUpperCase(),
                numVin: dto.numVin?.toUpperCase(),
                color: dto.color?.trim(),
            };

            // Validar unicidad si se están actualizando campos únicos
            const conditions: any[] = [];

            if (dto.patente && dto.patente.toUpperCase() !== vehicle.patente) {
                conditions.push({ patente: dto.patente.toUpperCase() });
            }

            if (dto.numMotor && dto.numMotor.toUpperCase() !== vehicle.numMotor) {
                conditions.push({ numMotor: dto.numMotor.toUpperCase() });
            }

            if (dto.numVin && dto.numVin.toUpperCase() !== vehicle.numVin) {
                conditions.push({ numVin: dto.numVin.toUpperCase() });
            }

            if (conditions.length > 0) {
                const duplicate = await this.vehicleModel.findOne({
                    $or: conditions,
                    _id: { $ne: id }, // Excluir el vehículo actual
                });

                if (duplicate) {
                    let field = "";

                    if (duplicate.patente === updatedData.patente) field = "patente";
                    else if (duplicate.numMotor === updatedData.numMotor) field = "número de motor";
                    else if (duplicate.numVin === updatedData.numVin) field = "número VIN";

                    throw new BadRequestException({
                        statusCode: 400,
                        message: `Ya existe un vehículo con este ${field}`,
                    });
                }
            }

            const updatedVehicle = await this.vehicleModel.findByIdAndUpdate(id, updatedData, {
                new: true,
            }).exec();

            return ApiResponse.success("Vehículo actualizado exitosamente", updatedVehicle);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException({
                statusCode: 500,
                message: "Error interno del servidor",
                error: error.message || "Unknown error",
            });
        }

    }

    async deleteVehicle(id: string): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id); 
            // Validar ObjectId
            if (!Types.ObjectId.isValid(castedId)) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: "ID inválido",
                    error: "El ID proporcionado no es válido",
                });
            }

            const vehicle = await this.vehicleModel.findById(id).exec();

            if (!vehicle) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: "No se ha encontrado el vehículo",
                    error: "No se ha encontrado el vehículo",
                });
            }

            await this.vehicleModel.findByIdAndDelete(id).exec();

            return ApiResponse.success("Vehículo eliminado exitosamente", null);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: "Error interno del servidor",
                error: error.message || "Unknown error",
            });
        }
    }
}
