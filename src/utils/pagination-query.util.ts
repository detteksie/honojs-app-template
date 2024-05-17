import { Context } from 'hono';

export class PaginationQuery {
  declare page: number;

  declare limit: number;
}

type DefaultQuery = {
  page?: number;
  minPage?: number;
  limit?: number;
  minLimit?: number;
};
const defaultQuery: DefaultQuery = {
  page: 1,
  minPage: 1,
  limit: 10,
  minLimit: 5,
};

export function checkPaginationDefault(
  query: Record<string, string | number>,
  value: DefaultQuery = defaultQuery,
) {
  if (!query['page'] || +query['page'] < value.minPage!) query['page'] = value.page!;
  if (!query['limit'] || +query['limit'] < value.minLimit!) query['limit'] = value.limit!;
}

export const getPaginationQuery = (c: Context) => {
  const user = c.get('pagination');
  return user;
};
