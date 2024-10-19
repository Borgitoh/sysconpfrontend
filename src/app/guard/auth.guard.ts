import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../modules/sysconp/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    authService.redirectToLogin();
  }

  return isAuthenticated;
};
