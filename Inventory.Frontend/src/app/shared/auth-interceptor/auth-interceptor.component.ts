import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-interceptor',
  templateUrl: './auth-interceptor.component.html',
  styleUrls: ['./auth-interceptor.component.css']
})

@Injectable()
export class AuthInterceptorComponent implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + btoa('Admin:Admin'))
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    });
      
    return next.handle(headers);
  }
}
