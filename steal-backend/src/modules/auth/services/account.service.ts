import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DATABASE_SERVICES } from 'src/modules/database/database.provider';

@Injectable()
export class AccountService {
  constructor(
    @Inject(DATABASE_SERVICES) private readonly databaseService: PrismaClient,
  ) {}

  async registerAccount(username: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.databaseService.users.findMany({
      where: {
        email,
      },
    });

    if (user && user[0]?.id) {
      throw new Error(`Username ${email} already exists`);
    }

    const createdUser = await this.databaseService.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        salt,
      },
    });

    // eslint-disable-next-line
    const { password: _, salt: __, ...rest } = createdUser;

    return {
      ...rest,
    };
  }

  async validateAccount(email: string, password: string) {
    const user = await this.databaseService.users.findMany({
      where: {
        email,
      },
    });

    if (!user || !user[0]?.id) {
      throw new Error(`Username ${email} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      throw new Error(`Invalid password`);
    }

    return {
      username: user[0].username,
      email: user[0].email,
    };
  }
}
