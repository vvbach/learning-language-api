import { Module } from '@nestjs/common';
import { WordTranslationMapService } from './word-translation-map.service';
import { WordTranslationMapController } from './word-translation-map.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [WordTranslationMapController],
  providers: [WordTranslationMapService, PrismaClient],
})
export class WordTranslationMapModule {}
