import { ApiProperty } from '@nestjs/swagger';

export default class RefreshRequestDto {
  @ApiProperty()
  refreshToken: string;
}
