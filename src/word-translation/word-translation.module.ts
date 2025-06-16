import { Module } from '@nestjs/common';
import { WordTranslationService } from './word-translation.service';
import { WordTranslationController } from './word-translation.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [WordTranslationController],
  providers: [WordTranslationService, PrismaClient],
})
export class WordTranslationModule {}
