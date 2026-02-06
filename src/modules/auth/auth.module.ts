import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../infrastructure/users/users.module';
import { TokensModule } from '../../infrastructure/tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
