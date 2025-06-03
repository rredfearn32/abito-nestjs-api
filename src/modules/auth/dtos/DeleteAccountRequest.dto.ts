import { ApiProperty } from '@nestjs/swagger';

export default class DeleteAccountRequestDto {
  @ApiProperty()
  sub: number;
}
