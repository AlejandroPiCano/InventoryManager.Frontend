import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryAppService } from './core/services/inventory-service.service';
import { InventoryItemsListComponent } from './components/inventory-items-list/inventory-items-list.component';
import { InventoryItemDetailComponent } from './components/inventory-detail/inventory-detail.component';
import { InventoryItemFormComponent } from './components/inventory-form/inventory-form.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptorComponent } from './shared/auth-interceptor/auth-interceptor.component';

// Another way for send token in headers, using a TokenGetter from JwtModule
// export function tokenGetter() {
//   return  localStorage.getItem('jwt');
// }

@NgModule({
  declarations: [
    AppComponent,
    InventoryItemsListComponent,
    InventoryItemDetailComponent,
    InventoryItemFormComponent,
    AuthInterceptorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // Another way for send token in headers, using a TokenGetter from JwtModule
    // JwtModule.forRoot({
    //   config:{
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["http://localhost:61408"],
    //     disallowedRoutes: []
    //   }
    // })
  ],
  providers: [InventoryAppService, HttpClientModule, 
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorComponent, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
