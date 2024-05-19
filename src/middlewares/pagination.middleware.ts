import { createMiddleware } from 'hono/factory';

import { checkPaginationDefault } from '|/utils/pagination-query.util';

export const paginationMiddleware = () =>
  createMiddleware(async (c, next) => {
    // console.log('setting up pagination middleware');
    const page = c.req.query('page');
    const limit = c.req.query('limit');
    const query = { page, limit };
    checkPaginationDefault(query);
    c.set('pagination', query);
    await next();
  });
