import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    if (!request.url.includes("users/1")) {
      return next.handle(request);
    }
    const httpsReq = request.clone({
      url: request.url.replace("http://", "https://")
    });
    return next.handle(request);
  }
}
