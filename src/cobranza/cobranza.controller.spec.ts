import { Test, TestingModule } from '@nestjs/testing';
import { CobranzaController } from './cobranza.controller';

describe('CobranzaController', () => {
  let controller: CobranzaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CobranzaController],
    }).compile();

    controller = module.get<CobranzaController>(CobranzaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
