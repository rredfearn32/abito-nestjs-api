import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [GoalsModule],
  controllers: [CronController],
  providers: [CronService],
})
export class CronModule {}
