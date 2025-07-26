import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CompanyService } from "../services/company.service";
import { CreateCompanyDto, UpdateCompanyDto } from "../dto/company.dto";

@Controller('company')
export class CompanyController {

    constructor(
        private readonly companyService: CompanyService,
    ) { }

    @Get()
    async getAllCompanies() {
        return this.companyService.getAllCompanies();
    }

    @Get(':id')
    async getCompany(@Param('id') id: string) {
        return this.companyService.getCompany(id);
    }

    @Get('name/:name')
    async getCompanyByName(@Param('name') name: string) {
        return this.companyService.getCompanyByName(name);
    }

    @Post()
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.createCompany(createCompanyDto);
    }

    @Put(':id')
    async updateCompany(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.companyService.updateCompany(id, updateCompanyDto);
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: string) {
        return this.companyService.deleteCompany(id);
    }


}