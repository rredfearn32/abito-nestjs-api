import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RefreshTokensRepositoryClient {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, token: string, expiresAt: Date) {
    return this.prismaService.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async find(token: string) {
    return this.prismaService.refreshToken.findUnique({
      where: { token },
    });
  }

  async revoke(token: string) {
    return this.prismaService.refreshToken.update({
      where: { token },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForUser(userId: number) {
    return this.prismaService.refreshToken.updateMany({
      where: { userId: userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async delete() {
    return this.prismaService.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}
