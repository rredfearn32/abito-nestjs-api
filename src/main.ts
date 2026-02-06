import { bootstrap } from './bootstrap';

async function main() {
  const app = await bootstrap();
  await app.listen(process.env.PORT ?? 3000);
}

main();
