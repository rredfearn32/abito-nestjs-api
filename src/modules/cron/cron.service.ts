import { Injectable } from '@nestjs/common';
import { StreaksService } from '../goals/streaks.service';

@Injectable()
export class CronService {
  constructor(private readonly streaksService: StreaksService) {}

  async expireStreaks(): Promise<void> {
    await this.streaksService.expireStreaks();
  }
}
