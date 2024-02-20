import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EpochInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Convert date properties to epoch timestamps
        this.convertDatesToEpoch(data);
        return data;
      }),
    );
  }

  private convertDatesToEpoch(data: any) {
    if (data instanceof Date) {
      data = data.getTime(); // Convert the date object to epoch timestamp
    } else if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof Date) {
            data[key] = data[key].getTime(); // Convert date property to epoch timestamp
          } else if (typeof data[key] === 'object') {
            this.convertDatesToEpoch(data[key]); // Recursively convert nested objects
          }
        }
      }
    }
  }
}
