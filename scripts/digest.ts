import process from 'node:process';
import { runCli } from './digest/main';

runCli().catch((err) => {
  console.error(`[digest] Fatal error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
