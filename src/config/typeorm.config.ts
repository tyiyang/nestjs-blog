/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-28 09:40:16
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-28 09:49:55
 * @FilePath: \real-world\src\config\typeorm.config.ts
 * @Description:
 *
 */
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> => {
  return {
    migrations: [join(__dirname, '..', 'db/migrations/**/*{.ts,.js}')],
    entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
    host: configService.get('DB_HOST'),
    type: configService.get('DB_TYPE'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
  };
};
