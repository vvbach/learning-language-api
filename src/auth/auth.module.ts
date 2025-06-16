import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService]
})
export class AuthModule {}
