import { Module } from '@nestjs/common';
import { CobranzaService } from './cobranza.service';
import { CobranzaController } from './cobranza.controller';

@Module({
  providers: [CobranzaService],
  controllers: [CobranzaController]
})
export class CobranzaModule {}
