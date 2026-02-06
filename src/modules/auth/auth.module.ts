import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../infrastructure/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from '../../infrastructure/tokens/tokens.module';

@Module({
  imports: [
    UsersModule,
    TokensModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
