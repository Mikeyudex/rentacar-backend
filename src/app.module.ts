import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ControlDocumentalModule } from './control-documental/control-documental.module';

@Module({
  imports: [VehiclesModule, ControlDocumentalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
