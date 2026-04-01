import { ApiProperty } from '@nestjs/swagger';

export default class UserResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() username: string;
  @ApiProperty() email: string;
}
