import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService,
    ) { }

    @Get()
    async getVehicles(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search?: string,
        @Query('marca') marca?: string,
        @Query('color') color?: string,
        @Query('sortBy') sortBy = 'patente',
        @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
    ) {
        return this.vehiclesService.getVehicles({
            page: Number(page),
            limit: Number(limit),
            search,
            marca,
            color,
            sortBy,
            sortOrder,
        });
    }

    @Get(':id')
    async getVehicle(@Param('id') id: string) {
        return this.vehiclesService.getVehicle(id);
    }

    @Post()
    async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.createVehicle(createVehicleDto);
    }

    @Put(':id')
    async updateVehicle(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.updateVehicle(id, updateVehicleDto);
    }

    @Delete(':id')
    async deleteVehicle(@Param('id') id: string) {
        return this.vehiclesService.deleteVehicle(id);
    }
}
