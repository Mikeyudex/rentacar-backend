import { Module } from '@nestjs/common';
import { ControlDocumentalController } from './control-documental.controller';
import { ControlDocumentalService } from './control-documental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ControlDocumental, ControlDocumentalSchema } from './control-documental.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ControlDocumental.name, schema: ControlDocumentalSchema }
    ])
  ],
  controllers: [ControlDocumentalController],
  providers: [ControlDocumentalService]
})
export class ControlDocumentalModule {}
