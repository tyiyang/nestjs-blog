export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'realworld',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
};
