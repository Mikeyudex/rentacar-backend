import { Module } from '@nestjs/common';
import { MaintenanceControlService } from './maintenance-control.service';
import { MaintenanceControlController } from './maintenance-control.controller';

@Module({
  providers: [MaintenanceControlService],
  controllers: [MaintenanceControlController]
})
export class MaintenanceControlModule {}
