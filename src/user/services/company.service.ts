import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Company, CompanyDocument } from "../schemas/company.schema";
import { ApiResponse } from "src/common/api-response";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "../dto/company.dto";


@Injectable()
export class CompanyService {

    constructor(
        @InjectModel(Company.name)
        private companyModel: Model<CompanyDocument>,
    ) { }

    async getAllCompanies(): Promise<ApiResponse<CompanyDocument[]>> {
        try {
            const companies = await this.companyModel.find().exec();
            return ApiResponse.success('Success', companies);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async getCompany(id: string): Promise<ApiResponse<CompanyDocument>> {
        try {
            let castedId = new Types.ObjectId(id);
            const company = await this.companyModel.findById(castedId).exec();
            if (!company) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el usuario',
                    error: 'No se ha encontrado el usuario',
                });
            }
            return ApiResponse.success('Success', company);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async getCompanyByName(name: string): Promise<ApiResponse<CompanyDocument>> {
        try {
            const company = await this.companyModel.findOne({ name: name }).exec();
            if (!company) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No se ha encontrado el usuario',
                    error: 'No se ha encontrado el usuario',
                });
            }
            return ApiResponse.success('Success', company);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<ApiResponse<CompanyDocument>> {
        try {
            const company = new this.companyModel(createCompanyDto);
            const createdCompany = await company.save();
            return ApiResponse.success('Success', createdCompany);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }

    async updateCompany(id: string, updateCompanyDto: CreateCompanyDto): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const company = await this.companyModel.findByIdAndUpdate(castedId, updateCompanyDto, { new: true }).exec();
            return ApiResponse.success('Success', company);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }

    }

    async deleteCompany(id: string): Promise<any> {
        try {
            let castedId = new Types.ObjectId(id);
            const company = await this.companyModel.findByIdAndDelete(castedId).exec();
            return ApiResponse.success('Success', company);
        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Error interno del servidor',
                error: error.message || 'Unknown error',
            });
        }
    }


}