import { ApiProperty } from '@nestjs/swagger';

export default class RefreshRequestDto {
  @ApiProperty()
  refresh_token: string;
}
