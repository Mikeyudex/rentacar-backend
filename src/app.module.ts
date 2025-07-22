import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ControlDocumentalModule } from './control-documental/control-documental.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [VehiclesModule, ControlDocumentalModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
