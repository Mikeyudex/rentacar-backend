import { Test, TestingModule } from '@nestjs/testing';
import { CorrectiveMaintenanceController } from './corrective-maintenance.controller';

describe('CorrectiveMaintenanceController', () => {
  let controller: CorrectiveMaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorrectiveMaintenanceController],
    }).compile();

    controller = module.get<CorrectiveMaintenanceController>(CorrectiveMaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
