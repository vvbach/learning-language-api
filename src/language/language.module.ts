import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [LanguageController],
  providers: [LanguageService, PrismaClient],
})
export class LanguageModule {}
