import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRoleService } from "../services/user-role.service";
import { CreateUserRoleDto } from "../dto/user-role.dto";


@Controller('user-role')
export class UserRoleController {

    constructor(
        private readonly userRoleService: UserRoleService
    ) { }

    @Get()
    async getAll() {
        return await this.userRoleService.getAllUserRoles();
    }

    @Get(':id')
    async getUserRole(@Param('id') id: string) {
        return await this.userRoleService.getUserRole(id);
    }

    @Post('create')
    async createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
        return await this.userRoleService.createUserRole(createUserRoleDto);
    }

    @Put(':id')
    async updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: CreateUserRoleDto) {
        return await this.userRoleService.updateUserRole(id, updateUserRoleDto);
    }

    @Delete(':id')
    async deleteUserRole(@Param('id') id: string) {
        return await this.userRoleService.deleteUserRole(id);
    }

}