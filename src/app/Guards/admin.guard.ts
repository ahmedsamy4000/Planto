import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('isAdmin') == "true")
    {
      return true;
    }
    location.assign('/error');
  return false;
};
