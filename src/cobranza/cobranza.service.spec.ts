import { Test, TestingModule } from '@nestjs/testing';
import { CobranzaService } from './cobranza.service';

describe('CobranzaService', () => {
  let service: CobranzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CobranzaService],
    }).compile();

    service = module.get<CobranzaService>(CobranzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
