import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PayloadToken } from './models/token.model';
import { UserService } from '../user/user.service';
import { ApiResponse } from '../common/api-response';
import { IUser } from 'src/user/schemas/user.schema';
import { IUserResponse } from 'src/user/interfaces/user-response.interface';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  generateJwtGlobal(user: IUser): string {
    const payload: PayloadToken = { sub: user._id.toString(), role: user.roleId.toString(), companyId: user.companyId.toString() };
    return this.jwtService.sign(payload);
  }

  generateJwt(user: IUser) {
    const payload: PayloadToken = { sub: user._id.toString(), role: user.roleId.toString(), companyId: user.companyId.toString() };
    let mapUser: IUserResponse = {
      _id: user._id.toString(),
      companyId: user.companyId.toString(),
      email: user.email,
      phone: user.phone,
      name: user.name,
      lastname: user.lastname,
      roleId: user.roleId.toString(),
      active: user.active,
      avatar: user?.avatar || '',
      createdAt: user.createdAt ? user.createdAt.toString() : '',
    }
    let loginResponse = {
      access_token: this.jwtService.sign(payload),
      user: mapUser
    };
    return ApiResponse.success('Login exitoso', loginResponse, 200);
  }

  validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return ApiResponse.success('token validado', decoded, 200);
    } catch (error) {
      return ApiResponse.error('token invalidado', error, 401);
    }
  }

  validateTokenGlobal(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
