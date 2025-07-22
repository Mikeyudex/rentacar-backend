import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceControlService } from './maintenance-control.service';

describe('MaintenanceControlService', () => {
  let service: MaintenanceControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceControlService],
    }).compile();

    service = module.get<MaintenanceControlService>(MaintenanceControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
