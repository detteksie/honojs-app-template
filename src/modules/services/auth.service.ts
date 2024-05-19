import createHttpError from 'http-errors';

import { Sql, sql } from '|/infrastructures/sql';
import { comparePassword } from '|/utils/bcrypt.util';
import { createToken } from '|/utils/jwt.util';

import { LoginDto, RegisterDto } from '../dto/auth.dto';

export class AuthService {
  constructor(private readonly sql: Sql) {}

  private loginError() {
    throw createHttpError(400, 'Email or Password is invalid');
  }

  private async findEmail(email: string) {
    const user = await this.sql.User.findOne({ where: { email } });
    if (user) {
      throw createHttpError(409, 'Email already exist');
    }
  }

  async register(registerDto: RegisterDto) {
    const { name, email, password, birthdate } = registerDto;
    await this.findEmail(email);
    const user = await this.sql.User.create({
      name,
      email,
      password,
      birthdate,
    });
    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.sql.User.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });
    if (!user) this.loginError();

    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) this.loginError();

    const tokens = {
      tokenType: 'Bearer',
      accessToken: createToken(user),
      refreshToken: createToken(user, 'refresh'),
    };
    return tokens;
  }
}

export const authService = new AuthService(sql);
