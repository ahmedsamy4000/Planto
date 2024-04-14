import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('userToken')) {
    interface MyToken {
      email: string;
      id: string;
      isAdmin: string;
      iat: number
    };
    const decodedToken = jwtDecode<MyToken>(localStorage.getItem("userToken")!);
    if (decodedToken.isAdmin)
      return true;
  }
  location.assign('/error');
  return false;
};
