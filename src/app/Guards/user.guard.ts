import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('Email'))
    {
      return true;
    }
    location.assign('/error');
  return false;
};
