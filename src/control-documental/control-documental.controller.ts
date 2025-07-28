import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ControlDocumentalService } from './control-documental.service';
import { CreateControlDocumentalDto, UpdateControlDocumentalDto } from './dto/control-documental.dto';

@Controller('control-documental')
export class ControlDocumentalController {

    constructor(
        private readonly controlDocumentalService: ControlDocumentalService,
    ) { }

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

    @Get(':id')
    async getControlDocumental(@Param('id') id: string) {
        return this.controlDocumentalService.getById(id);
    }

    @Post()
    async createControlDocumental(@Body() createControlDocumentalDto: CreateControlDocumentalDto) {
        return this.controlDocumentalService.create(createControlDocumentalDto);
    }

    @Put(':id')
    async updateControlDocumental(@Param('id') id: string, @Body() updateControlDocumentalDto: UpdateControlDocumentalDto) {
        return this.controlDocumentalService.update(id, updateControlDocumentalDto);
    }

    @Delete(':id')
    async deleteControlDocumental(@Param('id') id: string) {
        return this.controlDocumentalService.delete(id);
    }
}
