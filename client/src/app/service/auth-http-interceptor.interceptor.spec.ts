import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorInterceptor } from './auth-http-interceptor.interceptor';

describe('AuthHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthHttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthHttpInterceptorInterceptor = TestBed.inject(AuthHttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
