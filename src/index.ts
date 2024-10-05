import './global';
import { newApp } from './app';
import { sql } from './infrastructures/sql';

async function main() {
  await Promise.all([sql.authenticate()]);
}
main();

const app = newApp();
export default app;
