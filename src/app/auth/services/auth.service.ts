import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import {BaseService} from '../../core/services/base.service';
import {HttpWrapper} from '../../core/http/http.wrapper';
import {RequestOptions} from '../../core/interfaces/request-options';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class AuthenticationService extends BaseService<any, RequestOptions<any>> {

  constructor(protected http: HttpWrapper,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute ) {
    super(http, '/auth');
  }

  protected onSuccess(options: RequestOptions<any>): (response) => any {
    return super.onSuccess(options, true);
  }

  login(options: RequestOptions<any>): Subscription {
    return this.http.post(super.buildUrl(options, '/login'), options.data, 'basic', this.onSuccess(options), this.onError(options));
  }

  register(options: RequestOptions<any>): Subscription {
    return this.http.post(super.buildUrl(options, '/register'), options.data, 'json', this.onSuccess(options), this.onError(options));
  }

  logout(options: RequestOptions<any>): Subscription {
    return this.http.post(super.buildUrl(options, '/logout'), null, 'basic', this.onSuccess(options), this.onError(options));
  }

  getAccessToken(): string {
    return this.cookieService.get('auth-token');
  }

  setAccessToken(token: string): void {
    this.cookieService.put('auth-token', token);
  }

  removeAccessToken(): void {
    this.cookieService.remove('auth-token');
  }

  redirectAfterLogin(): void {
    const queryParamsRedirectUrl = this.route.snapshot.queryParams['redirectUrl'];
    const cookieRedirectUrl = this.cookieService.get('redirectUrl');
    this.cookieService.remove('redirectUrl');

    let redirectUrl = '/';

    if (queryParamsRedirectUrl) {
      redirectUrl = queryParamsRedirectUrl;
    }
    if (cookieRedirectUrl) {
      redirectUrl = cookieRedirectUrl;
    }

    this.router.navigate([redirectUrl]);
  }

  public clearSession() {
    this.removeAccessToken();
    this.router.navigate(['/auth/login']);
  }
}
