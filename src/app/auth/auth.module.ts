import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing-module';
import {AuthenticationService} from './services/auth.service';
import { RegistrationComponent } from './registration/registration.component';
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ],
  providers: [AuthenticationService]
})
export class AuthModule {
}
