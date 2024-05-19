import { Hono } from 'hono';

import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthService, authService } from '../services/auth.service';
import { authValidation } from '../validations/auth.validation';

export const newAuthController = (authService: AuthService) => {
  const app = new Hono()

    .post('register', authValidation.register, async (c) => {
      const body: RegisterDto = await c.req.json();
      const result = await authService.register(body);
      return c.json(result);
    })

    .post('login', authValidation.login, async (c) => {
      const body: LoginDto = await c.req.json();
      const result = await authService.login(body);
      return c.json(result);
    });

  return app;
};

export const authController = newAuthController(authService);
