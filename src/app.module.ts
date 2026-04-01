import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GoalsModule } from './modules/goals/goals.module';
import { CronModule } from './modules/cron/cron.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    AuthModule,
    UsersModule,
    GoalsModule,
    CronModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
