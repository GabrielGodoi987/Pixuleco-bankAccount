import { DataSource } from 'typeorm';
import { userFactory } from './factories/user.factory';
import { dataSourceOptions } from '../connection/datasource';

const datasource = new DataSource(dataSourceOptions);

async function runSeed() {
  await datasource.initialize();
  await userFactory({ datasource, quantity: 1000 });
}

runSeed()
  .then(async (res) => {
    console.log(res);
    await datasource.destroy();
    console.log('✅🍃 seed succesfuly done!');
  })
  .catch((err) => {
    console.error('Erro ao rodar seed:', err);
  });
