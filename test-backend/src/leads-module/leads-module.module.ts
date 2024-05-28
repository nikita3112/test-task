import { Module } from '@nestjs/common';
import { LeadsController } from './leads-module.controller';
import { LeadsService } from './leads-module.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModuleModule {}
