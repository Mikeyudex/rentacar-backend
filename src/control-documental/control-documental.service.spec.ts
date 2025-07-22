import { Test, TestingModule } from '@nestjs/testing';
import { ControlDocumentalService } from './control-documental.service';

describe('ControlDocumentalService', () => {
  let service: ControlDocumentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlDocumentalService],
    }).compile();

    service = module.get<ControlDocumentalService>(ControlDocumentalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
