import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (this.isSingleObjectResponse(data)) {
          return { data };
        }
        return data;
      }),
    );
  }

  private isSingleObjectResponse(data: any): boolean {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
  }
}
