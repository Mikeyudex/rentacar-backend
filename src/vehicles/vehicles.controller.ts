import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService,
    ) { }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getVehicle(@Param('id') id: string) {
        return this.vehiclesService.getVehicle(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.createVehicle(createVehicleDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateVehicle(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.updateVehicle(id, updateVehicleDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteVehicle(@Param('id') id: string) {
        return this.vehiclesService.deleteVehicle(id);
    }
}
