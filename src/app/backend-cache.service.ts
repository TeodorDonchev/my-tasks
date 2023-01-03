import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendCacheService<T> {
  readonly CACHE_DURATION_IN_MINUTES = 5;

  private cache?: {
    expires: Date,
    value: Observable<T[]>
  };

  constructor() { }

  getValue(): Observable<T[]> {
    if (!this.cache) {
      return throwError(() => "cache is empty");
    }

    if (dayjs(new Date()).isAfter(this.cache.expires)) {
      return throwError(() => "cache has expired");
    }

    return this.cache.value;
  }

  setValue(value: Observable<T[]>) {
    this.cache = {
      value,
      expires: dayjs(new Date()).add(this.CACHE_DURATION_IN_MINUTES, 'minutes').toDate()
    };
  }

  clearCache() {
    this.cache = undefined;
  }
}
