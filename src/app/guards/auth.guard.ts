import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.currentUser) {
    return true; // ✅ Usuario autenticado, permite el acceso
  } else {
    router.navigate(['/auth']); // 🔴 Usuario no autenticado, redirigir al login
    return false;
  }
};
