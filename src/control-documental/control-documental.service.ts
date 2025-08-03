import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as moment from 'moment';
import { ControlDocumental, ControlDocumentalDocument } from './control-documental.schema';
import { PaginatedResponse } from 'src/common/interfaces/paginated.interface';
import { ApiResponse } from 'src/common/api-response';
import { CreateControlDocumentalDto, UpdateControlDocumentalDto } from './dto/control-documental.dto';
import { getCurrentUTCDate } from 'src/utils/getUtcDate';

interface GetControlDocumentalsParams {
    page: number
    limit: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

@Injectable()
export class ControlDocumentalService {

    constructor(@InjectModel(ControlDocumental.name) private controlDocumentalModel: Model<ControlDocumentalDocument>) { }

    async getAll(params: GetControlDocumentalsParams): Promise<PaginatedResponse<ControlDocumental>> {
        try {
            const { page, limit, search, sortBy = 'createdAt', sortOrder = 'asc' } = params;

            const filters: any = {};

            // Búsqueda general (en varias propiedades)
            if (search) {
                const regex = new RegExp(search, 'i');
                filters.$or = [
                    { vehicleId: regex },
                    { padron: regex },
                    { permisoCirculacionFile: regex },
                    { revisionTecnicaFile: regex },
                    { seguroObligatorioFile: regex },
                    { seguroGeneralFile: regex },
                ];
            }

            const totalItems = await this.controlDocumentalModel.countDocuments(filters);

            const controlDocumentals = await this.controlDocumentalModel
                .find(filters)
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();

            const totalPages = Math.ceil(totalItems / limit);

            return {
                data: controlDocumentals,
                meta: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    itemsPerPage: limit,
                },
            };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async getByVehicleId(vehicleId: string): Promise<ApiResponse<ControlDocumental>> {
        try {
            let castedId = new Types.ObjectId(vehicleId);
            // Validar ObjectId
            if (!Types.ObjectId.isValid(castedId)) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID inválido',
                    error: 'El ID proporcionado no es válido',
                });
            }

            const controlDocumental = await this.controlDocumentalModel.findOne({ vehicleId: castedId }).exec();

            if (!controlDocumental) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el control documental',
                    error: 'No se ha encontrado el control documental',
                });
            }

            return ApiResponse.success('Control documental encontrado', controlDocumental);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async create(dto: CreateControlDocumentalDto): Promise<ApiResponse<ControlDocumental>> {
        try {
            if (!dto.vehicleId) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID del vehículo no puede ser nulo',
                    error: 'El ID del vehículo no puede ser nulo',
                });
            }

            if (!Types.ObjectId.isValid(dto.vehicleId)) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID del vehñiculo no es válido',
                    error: 'El ID del vehículo no es válido',
                });
            }
            if(!dto.padron) dto.padron = "";
            if(!dto.seguroGeneralFile) dto.seguroGeneralFile = "";

            dto.vehicleId = new Types.ObjectId(dto.vehicleId);

            if (dto.permisoCirculacionExpiracion && moment.isDate(dto.permisoCirculacionExpiracion)) {
                dto.permisoCirculacionExpiracion = moment(dto.permisoCirculacionExpiracion, 'YYYY-MM-DD').toDate();
            }
            if (dto.revisionTecnicaExpiracion && moment.isDate(dto.revisionTecnicaExpiracion)) {
                dto.revisionTecnicaExpiracion = moment(dto.revisionTecnicaExpiracion, 'YYYY-MM-DD').toDate();
            }
            if (dto.seguroObligatorioExpiracion && moment.isDate(dto.seguroObligatorioExpiracion)) {
                dto.seguroObligatorioExpiracion = moment(dto.seguroObligatorioExpiracion, 'YYYY-MM-DD').toDate();
            }

            const controlDocumental = new this.controlDocumentalModel(dto);
            const createdControlDocumental = await controlDocumental.save();
            return ApiResponse.success('Control documental creado exitosamente', createdControlDocumental);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async update(id: string, updateControlDocumentalDto: UpdateControlDocumentalDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            if (!Types.ObjectId.isValid(castedId)) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID inválido',
                    error: 'El ID proporcionado no es válido',
                });
            }

            const controlDocumental = await this.controlDocumentalModel.findById(id).exec();
            if (!controlDocumental) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el control documental',
                    error: 'No se ha encontrado el control documental',
                });
            }

            const updatedData: Partial<ControlDocumental> = {
                ...updateControlDocumentalDto,
                updatedAt: getCurrentUTCDate(),
            };

            const updatedControlDocumental = await this.controlDocumentalModel.findByIdAndUpdate(id, updatedData, {
                new: true,
            }).exec();

            return ApiResponse.success('Control documental actualizado exitosamente', updatedControlDocumental);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }

    }

    async delete(id: string): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            // Validar ObjectId
            if (!Types.ObjectId.isValid(castedId)) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID inválido',
                    error: 'El ID proporcionado no es válido',
                });
            }

            const controlDocumental = await this.controlDocumentalModel.findById(id).exec();

            if (!controlDocumental) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el control documental',
                    error: 'No se ha encontrado el control documental',
                });
            }

            await this.controlDocumentalModel.findByIdAndDelete(id).exec();

            return ApiResponse.success('Control documental eliminado exitosamente', null);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }
}
