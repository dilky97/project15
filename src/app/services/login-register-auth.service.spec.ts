import { TestBed } from '@angular/core/testing';

import { LoginRegisterAuthService } from './login-register-auth.service';

describe('LoginRegisterAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRegisterAuthService = TestBed.get(LoginRegisterService);
    expect(service).toBeTruthy();
  });
});
