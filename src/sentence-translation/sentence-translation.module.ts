import { Module } from '@nestjs/common';
import { SentenceTranslationService } from './sentence-translation.service';
import { SentenceTranslationController } from './sentence-translation.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SentenceTranslationController],
  providers: [SentenceTranslationService, PrismaClient],
})
export class SentenceTranslationModule {}
