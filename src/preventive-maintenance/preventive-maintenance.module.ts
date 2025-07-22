import { Module } from '@nestjs/common';
import { PreventiveMaintenanceService } from './preventive-maintenance.service';
import { PreventiveMaintenanceController } from './preventive-maintenance.controller';

@Module({
  providers: [PreventiveMaintenanceService],
  controllers: [PreventiveMaintenanceController]
})
export class PreventiveMaintenanceModule {}
