import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    async getAll() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.userService.getUser(id);
    }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }
}
