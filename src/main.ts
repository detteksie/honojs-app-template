import { sql } from './infrastructures/sql';
import { newServer } from './server';

async function main() {
  await Promise.all([sql.authenticate()]);
}
main();

const server = newServer();
export default server;
