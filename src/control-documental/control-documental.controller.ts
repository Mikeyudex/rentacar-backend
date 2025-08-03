import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ControlDocumentalService } from './control-documental.service';
import { CreateControlDocumentalDto, UpdateControlDocumentalDto } from './dto/control-documental.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('control-documental')
export class ControlDocumentalController {

    constructor(
        private readonly controlDocumentalService: ControlDocumentalService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllControlDocumentals(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search?: string,
        @Query('sortBy') sortBy = 'createdAt',
        @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
    ) {
        return this.controlDocumentalService.getAll({
            page: Number(page),
            limit: Number(limit),
            search,
            sortBy,
            sortOrder,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getByVehicleId/:id')
    async getControlDocumental(@Param('id') id: string) {
        return this.controlDocumentalService.getByVehicleId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createControlDocumental(@Body() createControlDocumentalDto: CreateControlDocumentalDto) {
        return this.controlDocumentalService.create(createControlDocumentalDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateControlDocumental(@Param('id') id: string, @Body() updateControlDocumentalDto: UpdateControlDocumentalDto) {
        return this.controlDocumentalService.update(id, updateControlDocumentalDto);
    }   

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteControlDocumental(@Param('id') id: string) {
        return this.controlDocumentalService.delete(id);
    }
}
