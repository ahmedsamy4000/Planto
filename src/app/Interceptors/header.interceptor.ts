import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
    let token: any =  localStorage.getItem('userToken');
  let newReq = req.clone({
    headers: req.headers.set('token', token)
  })
  return next(newReq);
};
