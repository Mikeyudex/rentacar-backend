import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCustomers(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search?: string,
        @Query('sortBy') sortBy = 'createdAt',
        @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
    ) {
        return this.customerService.getAll({
            page: Number(page),
            limit: Number(limit),
            search,
            sortBy,
            sortOrder,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCustomer(@Param('id') id: string) {
        return this.customerService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCustomer(@Body() createCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto) {
        return this.customerService.update(id, updateCustomerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: string) {
        return this.customerService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':ids')
    async bulkDeleteCustomer(@Param('ids') ids: string[]) {
        return this.customerService.bulkDelete(ids);
    }
}
