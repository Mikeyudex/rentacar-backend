import { Test, TestingModule } from '@nestjs/testing';
import { ControlDocumentalController } from './control-documental.controller';

describe('ControlDocumentalController', () => {
  let controller: ControlDocumentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlDocumentalController],
    }).compile();

    controller = module.get<ControlDocumentalController>(ControlDocumentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
