import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('userToken'))
    {
      return true;
    }
    location.assign('/error');
  return false;
};
