import { zValidator } from '@hono/zod-validator';

import { createUserDto, updateUserDto, userIdParam } from '../dto/user.dto';

export class UserValidation {
  createUser = zValidator('json', createUserDto);

  userId = zValidator('param', userIdParam);

  updateProfile = zValidator('json', updateUserDto);
}

export const userValidation = new UserValidation();
