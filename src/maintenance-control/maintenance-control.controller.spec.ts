import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceControlController } from './maintenance-control.controller';

describe('MaintenanceControlController', () => {
  let controller: MaintenanceControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceControlController],
    }).compile();

    controller = module.get<MaintenanceControlController>(MaintenanceControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
