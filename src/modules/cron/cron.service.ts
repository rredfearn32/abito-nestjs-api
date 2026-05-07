import { Injectable, Logger } from '@nestjs/common';
import { StreaksService } from '../goals/streaks.service';

@Injectable()
export class CronService {
  constructor(private readonly streaksService: StreaksService) {}
  private readonly logger = new Logger(CronService.name);

  async expireStreaks(): Promise<void> {
    const expired = await this.streaksService.expireStreaks();
    this.logger.log(
      `Expired ${expired.length} streaks: ${expired.map((s) => s.id).join(', ')}`,
    );
  }
}
