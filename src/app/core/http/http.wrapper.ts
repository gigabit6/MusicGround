import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {Subscription} from 'rxjs/Subscription';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class HttpWrapper {

  optionRules: { [name: string]: () => RequestOptionsArgs } = {
    'basic': this.getRequestOptionArgs,
    'file': this.sendFileRequestOptionArgs
  };

  constructor(private http: Http,
              private cookieService: CookieService) {

  }

  public get(url: string, optionsType: string, callbackSuccess?: (success) => any, callbackError?: (error) => any, notHandleError?: boolean): Subscription {
    const requestOptions = this.setRequestHeaders(optionsType);

    return this.http.get(url, requestOptions).subscribe(
      success => {
        if (callbackSuccess) {
          callbackSuccess(success);
        }
      },
      error => {
        if (!notHandleError) {
          this.errorHandler(error, callbackError);
        } else {
          if (callbackError) {
            callbackError(error);
          }
        }
      }
    );
  }

  public post(url: string, body: any, optionsType: string, callbackSuccess?: (success) => any, callbackError?: (error) => any): Subscription {
    const requestOptions = this.setRequestHeaders(optionsType);

    return this.http.post(url, body, requestOptions).subscribe(
      success => {
        if (callbackSuccess) {
          callbackSuccess(success);
        }
      },
      error => {
        this.errorHandler(error, callbackError);
      }
    );
  }

  public put(url: string, body: any, optionsType: string, callbackSuccess?: (success) => any, callbackError?: (error) => any): Subscription {
    const requestOptions = this.setRequestHeaders(optionsType);

    return this.http.put(url, body, requestOptions).subscribe(
      success => {
        if (callbackSuccess) {
          callbackSuccess(success);
        }
      },
      error => {
        this.errorHandler(error, callbackError);
      }
    );
  }

  public delete(url: string, optionsType: string, callbackSuccess?: (success) => any, callbackError?: (error) => any): Subscription {
    const requestOptions = this.setRequestHeaders(optionsType);

    return this.http.delete(url, requestOptions).subscribe(
      success => {
        if (callbackSuccess) {
          callbackSuccess(success);
        }
      },
      error => {
        this.errorHandler(error, callbackError);
      }
    );
  }

  public patch(url: string, body: any, optionsType: string, callbackSuccess?: (success) => any, callbackError?: (error) => any): Subscription {
    const requestOptions = this.setRequestHeaders(optionsType);

    return this.http.patch(url, body, requestOptions).subscribe(
      success => {
        if (callbackSuccess) {
          callbackSuccess(success);
        }
      },
      error => {
        this.errorHandler(error, callbackError);
      }
    );
  }

  private errorHandler(error: Response, callbackError?: (error) => any) {
    if (callbackError) {
      callbackError(error);
    }
  }

  private setRequestHeaders(optionsType: string): RequestOptionsArgs {
    const rule = this.optionRules[optionsType];

    if (rule) {
      return rule();
    }
  }

  getRequestOptionArgs(): RequestOptionsArgs {
    const options = new RequestOptions();

    options.headers = new Headers();

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Accept', 'application/json');

    const token = this.cookieService.get('auth-token');

    if (token) {
      options.headers.append('x-auth-token', token);
    }

    return options;
  }

  getFormUrlEncodedRequestOptionArgs(): RequestOptionsArgs {
    const options = new RequestOptions();

    options.headers = new Headers();

    options.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return options;
  }

  getJsonRequestOptionArgs(): RequestOptionsArgs {
    const options = new RequestOptions();

    options.headers = new Headers();

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Accept', 'application/json');

    return options;
  }

  getAdpRequestOptionArgs(): RequestOptionsArgs {
    const options = new RequestOptions();

    options.headers = new Headers();

    const token = this.cookieService.get('adp');

    if (token) {
      options.headers.append('x-auth-token', token);
    }

    return options;
  }

  sendFileRequestOptionArgs(): RequestOptionsArgs {
    const options = new RequestOptions();

    options.headers = new Headers();

    const token = this.cookieService.get('auth-token');

    if (token) {
      options.headers.append('x-auth-token', token);
    }

    return options;
  }

}
