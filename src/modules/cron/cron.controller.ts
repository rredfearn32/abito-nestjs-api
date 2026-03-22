import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CronService } from './cron.service';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('expire-start-streaks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Expire stale in-progress streaks' })
  async expireStreaks(): Promise<void> {
    await this.cronService.expireStreaks();
  }
}
