import { Test, TestingModule } from '@nestjs/testing';
import { CorrectiveMaintenanceService } from './corrective-maintenance.service';

describe('CorrectiveMaintenanceService', () => {
  let service: CorrectiveMaintenanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorrectiveMaintenanceService],
    }).compile();

    service = module.get<CorrectiveMaintenanceService>(CorrectiveMaintenanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
