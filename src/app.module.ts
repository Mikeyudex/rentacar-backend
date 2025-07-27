import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ControlDocumentalModule } from './control-documental/control-documental.module';
import { CustomerModule } from './customer/customer.module';
import { MaintenanceControlModule } from './maintenance-control/maintenance-control.module';
import { PreventiveMaintenanceModule } from './preventive-maintenance/preventive-maintenance.module';
import { CorrectiveMaintenanceModule } from './corrective-maintenance/corrective-maintenance.module';
import { CobranzaModule } from './cobranza/cobranza.module';
import { ContratoModule } from './contrato/contrato.module';
import { environments } from './environments';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV!] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigType<typeof config>) => ({
        uri: configService.database.uri,
      }),
      inject: [config.KEY],
    }),
    VehiclesModule,
    ControlDocumentalModule,
    CustomerModule,
    MaintenanceControlModule,
    PreventiveMaintenanceModule,
    CorrectiveMaintenanceModule,
    CobranzaModule,
    ContratoModule,
    UserModule,
    AuthModule,
    UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
