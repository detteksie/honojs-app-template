import { Context } from 'hono';

import { User } from '|/models/user.model';

export type UserVariables = { user: User };

export const getUser = (c: Context): User => {
  const user = c.get('user');
  return user;
};
