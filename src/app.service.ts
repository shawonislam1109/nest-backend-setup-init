import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/provider/devConfig';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string },
  ) {}
  getHello(): string {
    return `Hello World!1 ${this.devConfigService.getDBHost()} PORT ${this.config.port}`;
  }
}
