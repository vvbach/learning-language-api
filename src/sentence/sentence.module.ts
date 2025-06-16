import { Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SentenceController],
  providers: [SentenceService, PrismaClient],
})
export class SentenceModule {}
