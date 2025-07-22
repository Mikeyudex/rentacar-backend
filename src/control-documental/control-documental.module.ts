import { Module } from '@nestjs/common';
import { ControlDocumentalController } from './control-documental.controller';
import { ControlDocumentalService } from './control-documental.service';

@Module({
  controllers: [ControlDocumentalController],
  providers: [ControlDocumentalService]
})
export class ControlDocumentalModule {}
