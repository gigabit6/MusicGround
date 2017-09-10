import { NgModule } from '@angular/core';
import {CookieModule, CookieService} from 'ngx-cookie';
import {HttpWrapper} from './http/http.wrapper';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    HttpModule,
    CookieModule.forRoot(),
  ],
  declarations: [],
  exports: [],
  providers: [
    CookieService,
    HttpWrapper,
  ]
})
export class CoreModule {
}
