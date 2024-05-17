import { createMiddleware } from 'hono/factory';
import createHttpError from 'http-errors';
import { JwtPayload } from 'jsonwebtoken';
import { sql } from '~/infrastructures/sql';
import { verifyToken } from '~/utils/jwt.util';

export const authMiddlware = (isSearch: boolean = false) =>
  createMiddleware(async (c, next) => {
    const token = c.req.header('authorization')?.replace('Bearer ', '');
    if (!token) {
      throw createHttpError(401);
    }

    const payload = verifyToken(token) as JwtPayload;

    let user = null;
    if (isSearch) {
      user = await sql.User.findByPk(payload.sub);
    } else {
      user = { id: payload.sub };
    }
    c.set('user', user);

    await next();
  });
