import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

type ClassType<T> = new () => T;

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(cxt: ExecutionContext, next: CallHandler): Observable<T> {
    return next
      .handle()
      .pipe(
        map((data: any) =>
          plainToClass(this.classType, data, { strategy: 'excludeAll' }),
        ),
      );
  }
}
