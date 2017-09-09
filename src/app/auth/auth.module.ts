import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing-module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule {
}
