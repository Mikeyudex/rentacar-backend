import { Module } from '@nestjs/common';
import { CorrectiveMaintenanceService } from './corrective-maintenance.service';
import { CorrectiveMaintenanceController } from './corrective-maintenance.controller';

@Module({
  providers: [CorrectiveMaintenanceService],
  controllers: [CorrectiveMaintenanceController]
})
export class CorrectiveMaintenanceModule {}
