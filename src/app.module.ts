import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ControlDocumentalModule } from './control-documental/control-documental.module';
import { CustomerModule } from './customer/customer.module';
import { MaintenanceControlModule } from './maintenance-control/maintenance-control.module';
import { PreventiveMaintenanceModule } from './preventive-maintenance/preventive-maintenance.module';
import { CorrectiveMaintenanceModule } from './corrective-maintenance/corrective-maintenance.module';

@Module({
  imports: [VehiclesModule, ControlDocumentalModule, CustomerModule, MaintenanceControlModule, PreventiveMaintenanceModule, CorrectiveMaintenanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
