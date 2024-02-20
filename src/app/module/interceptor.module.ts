import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EpochInterceptor } from 'src/app/interceptor/epoch.interceptor';
import { SectionInterceptor } from 'src/app/interceptor/section.interceptor';
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EpochInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SectionInterceptor,
    },
  ],
})
export class InterceptModule {}
