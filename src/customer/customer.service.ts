import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Customer, CustomerDocument } from './customer.schema';
import { ApiResponse } from 'src/common/api-response';
import { PaginatedResponse } from 'src/common/interfaces/paginated.interface';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

interface GetCustomersParams {
    page: number
    limit: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
    ) {}

    async getAll(params: GetCustomersParams): Promise<PaginatedResponse<Customer>> {
        try {
            const { page, limit, search, sortBy = 'createdAt', sortOrder = 'asc' } = params;

            const filters: any = {};

            // Búsqueda general (en varias propiedades)
            if (search) {
                const regex = new RegExp(search, 'i');
                filters.$or = [
                    { nombres: regex },
                    { apellidos: regex },
                    { rut: regex },
                    { direccion: regex },
                    { email: regex },
                    { telefono: regex },
                    { fotoCi: regex },
                    { fotoLicencia: regex },
                    { hojaAntecedentes: regex },
                    { hojaConductor: regex },
                    { eRut: regex },
                    { contratoUrl: regex },
                ];
            }

            const totalItems = await this.customerModel.countDocuments(filters);

            const customers = await this.customerModel
                .find(filters)
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();

            const totalPages = Math.ceil(totalItems / limit);

            return {
                data: customers,
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

    async getById(id: string): Promise<ApiResponse<Customer>> {
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

            const customer = await this.customerModel.findById(id).exec();

            if (!customer) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el cliente',
                    error: 'No se ha encontrado el cliente',
                });
            }

            return ApiResponse.success('Cliente encontrado', customer);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;

            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async create(dto: CreateCustomerDto): Promise<ApiResponse<Customer>> {
        try {
            const {email, telefono, rut} = dto;

            // Validar que no exista otro email, telefono o rut
            const exists = await this.customerModel.findOne({
                $or: [
                    { email: email },
                    { telefono: telefono },
                    { rut: rut },
                ],
            });

            if (exists) {
                let duplicatedField = "";

                if (exists.email === email) duplicatedField = "email";
                else if (exists.telefono === telefono) duplicatedField = "telefono";
                else if (exists.rut === rut) duplicatedField = "RUT";

                throw new BadRequestException({
                    statusCode: 400,
                    message: `Ya existe un cliente con este ${duplicatedField}`
                });
            }

            const customer = new this.customerModel({
                ...dto,
                nombres: dto.nombres.trim(),
                apellidos: dto.apellidos.trim(),
                rut: dto.rut.trim(),
                direccion: dto.direccion.trim(),
            });

            const createdCustomer = await customer.save();
            return ApiResponse.success('Cliente creado exitosamente', createdCustomer);
        } catch (error) {
            if (error instanceof BadRequestException) throw error;            
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            if (!Types.ObjectId.isValid(castedId)) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID inválido',
                    error: 'El ID proporcionado no es válido',
                });
            }
            
            const customer = await this.customerModel.findById(id).exec();
            if (!customer) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el cliente',
                    error: 'No se ha encontrado el cliente',
                });
            }   

            const updatedData: Partial<Customer> = {
                ...updateCustomerDto,
                nombres: updateCustomerDto.nombres?.trim(),
                apellidos: updateCustomerDto.apellidos?.trim(),
                email: updateCustomerDto.email?.trim(),
                telefono: updateCustomerDto.telefono?.trim(),
                rut: updateCustomerDto.rut?.trim(),
                direccion: updateCustomerDto.direccion?.trim(),
                fotoCi: updateCustomerDto.fotoCi,
                fotoLicencia: updateCustomerDto.fotoLicencia,
                hojaAntecedentes: updateCustomerDto.hojaAntecedentes,
                hojaConductor: updateCustomerDto.hojaConductor,
                eRut: updateCustomerDto.eRut,
                contratoUrl: updateCustomerDto.contratoUrl,
            };

            // Validar unicidad si se están actualizando campos únicos
            const conditions: any[] = [];

            if (updateCustomerDto.rut && updateCustomerDto.rut.trim() !== customer.rut) {
                conditions.push({ rut: updatedData.rut });
            }

            if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
                conditions.push({ email: updatedData.email });
            }

            if (updateCustomerDto.telefono && updateCustomerDto.telefono !== customer.telefono) {
                conditions.push({ telefono: updatedData.telefono });
            }

            if (conditions.length > 0) {
                const duplicate = await this.customerModel.findOne({
                    $or: conditions,
                    _id: { $ne: castedId }, // Excluir el cliente actual
                });

                if (duplicate) {
                    let field = "";

                    if (duplicate.email === updatedData.email) field = "email";
                    else if (duplicate.telefono === updatedData.telefono) field = "telefono";
                    else if (duplicate.rut === updatedData.rut) field = "RUT";

                    throw new BadRequestException({
                        statusCode: 400,
                        message: `Ya existe un cliente con este campo: ${field}`,
                    });
                }
            }

            const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updatedData, {
                new: true,
            }).exec();

            return ApiResponse.success('Cliente actualizado exitosamente', updatedCustomer);
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
            
            const customer = await this.customerModel.findById(castedId).exec();
            if (!customer) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el cliente',
                    error: 'No se ha encontrado el cliente',
                });
            }
            
            await this.customerModel.findByIdAndDelete(castedId).exec();
            return ApiResponse.success('Cliente eliminado exitosamente', null);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async bulkDelete(ids: string[]): Promise<any> {
        try {
            let castedIds = ids.map(id => new Types.ObjectId(id));
            // Validar ObjectId
            if (!castedIds.every(Types.ObjectId.isValid)) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'ID inválido',
                    error: 'El ID proporcionado no es válido',
                });
            }
            const customers = await this.customerModel.find({
                _id: { $in: castedIds },
            });
            if (!customers) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el cliente',
                    error: 'No se ha encontrado el cliente',
                });
            }
            await this.customerModel.deleteMany({ _id: { $in: castedIds } });
            return ApiResponse.success('Clientes eliminados exitosamente', null);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }


}
