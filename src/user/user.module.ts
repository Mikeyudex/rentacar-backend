import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRole, UserRoleSchema } from './schemas/user-role.schema';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRoleService } from './services/user-role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRole.name, schema: UserRoleSchema },
      { name: Company.name, schema: CompanySchema },
    ])
  ],
  providers: [UserService, CompanyService, UserRoleService],
  controllers: [UserController, CompanyController, UserRoleController],
  exports: [UserService, CompanyService, UserRoleService]
})
export class UserModule { }
