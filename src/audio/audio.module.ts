import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { PrismaClient } from '@prisma/client';
import { AudioController } from './audio.controller';

@Module({
  providers: [AudioService, PrismaClient],
  controllers: [AudioController]
})
export class AudioModule {}
