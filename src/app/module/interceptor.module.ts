import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EpochInterceptor } from 'src/app/interceptor/epoch.interceptor';
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EpochInterceptor,
    },
  ],
})
export class InterceptModule {}
