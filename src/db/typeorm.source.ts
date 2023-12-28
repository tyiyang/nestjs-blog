/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-28 09:50:41
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-28 10:00:50
 * @FilePath: \real-world\src\db\typeorm.source.ts
 * @Description:
 *
 */
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '../config/typeorm.config';
export default (async () => {
  ConfigModule.forRoot();
  const configService = new ConfigService();
  const config: DataSourceOptions = await typeOrmConfig(configService);
  return new DataSource(config);
})();
