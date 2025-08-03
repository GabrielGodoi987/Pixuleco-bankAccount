import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../entities/user.entity';

export async function userFactory({
  datasource,
  quantity,
}: {
  datasource: DataSource;
  quantity?: number;
}) {
  const userRepository = datasource.getRepository(UserEntity);
  await userRepository.deleteAll();

  if (!quantity) {
    quantity = 5;
  }

  const users: {
    name: string;
    email: string;
    cpf: string;
    password: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
    accounts: [];
  }[] = [];

  for (let i = 0; i < quantity; i++) {
    users.push({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: await cpfGenerator(datasource),
      password: faker.internet.password({ length: 10 }),
      birth_date: faker.date.birthdate().toString(),
      created_at: faker.date.anytime().toString(),
      updated_at: faker.date.anytime().toString(),
      accounts: [],
    });
  }

  await userRepository.save(users);

  return 'seed succesfuly done 🌱';
}

async function cpfGenerator(dataSource: DataSource): Promise<string> {
  const repository = dataSource.getRepository(UserEntity);
  let cpf = '';

  while (true) {
    for (let i = 0; i <= 11; i++) {
      cpf += Math.floor(Math.random() * 10);
    }

    const existendCpf = await repository
      .createQueryBuilder('u')
      .select('u."Cpf"')
      .where('u."Cpf" = :cpf', { cpf })
      .getOne();

    if (!existendCpf) {
      return cpf;
    }
  }
}
