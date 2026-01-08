import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './infrastructure/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { GoalsModule } from './modules/goals/goals.module';
import { TokensModule } from './infrastructure/tokens/tokens.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TokensModule,
    GoalsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
