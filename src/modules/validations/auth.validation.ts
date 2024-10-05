import { zValidator } from '@hono/zod-validator';

import { loginDto, registerDto } from '../dto/auth.dto';

export class AuthValidation {
  register = zValidator('json', registerDto);

  login = zValidator('json', loginDto);
}

export const authValidation = new AuthValidation();
