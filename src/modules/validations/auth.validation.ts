import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export class AuthValidation {
  register = zValidator(
    'json',
    z.object({
      name: z.string().max(255),
      email: z.string().email().trim(),
      password: z.string().min(8).max(64),
      birthdate: z.date().optional(),
    }),
  );

  login = zValidator(
    'json',
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(64),
    }),
  );
}

export const authValidation = new AuthValidation();
