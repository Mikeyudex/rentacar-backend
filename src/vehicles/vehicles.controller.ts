import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService,
    ) { }

    @Get()
    async getVehicles() {
        return this.vehiclesService.getVehicles();
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
