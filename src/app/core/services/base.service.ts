import {environment} from '../../../environments/environment';
import {RequestOptions} from '../interfaces/request-options';
import {HttpWrapper} from '../http/http.wrapper';

export abstract class BaseService<T, O extends RequestOptions<T>> {

  constructor(protected http: HttpWrapper, private collection: string) {
  }

  public buildUrl(options: O, suffix?: string): string {
    const getParams: { [key: string]: any } = options.getParams || {};

    let url = environment.apiUrl + this.buildUri(options);

    if (suffix) {
      url += suffix;
    }

    const params = this.buildGetParams(getParams);
    if (params) {
      url += '?' + params;
    }

    return url;
  }

  protected buildUri(options: O): string {
    let url = this.collection;

    if (options.id) {
      url += '/' + options.id;
    } else if (options.data && options.data['id']) {
      url += '/' + options.data['id'];
    }

    return url;
  }

  public getUri(): string {
    return environment.apiUrl + this.collection;
  }

  protected buildGetParams(params: { [key: string]: any }): string {

    let result = '';

    for (const prop in params) {
      if (params.hasOwnProperty(prop)) {
        if (result) {
          result += '&';
        }

        if (Array.isArray(params[prop])) {
          result += encodeURIComponent(prop) + '=' + (<Array<string>>params[prop]).map(x => encodeURIComponent(x)).join(',');
        } else {
          result += encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]);
        }
      }
    }

    return result;
  }

  protected onSuccess(options: O, skipParse?: boolean) {
    return (response) => {
      if (!skipParse) {
        response = response._body ? response.json() : {};
      }

      if (options.onSuccess) {
        options.onSuccess(response);
      }
    };
  }

  protected onError(options: O) {
    return (response) => {
      const isValidJson = this.isJsonString(response._body);

      if (isValidJson) {
        response = response.json();
      } else {
        response = {};
      }

      if (options.onError && isValidJson) {
        options.onError(response);
      }
    };
  }

  private isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  protected isSet(x: any): boolean {
    return x !== undefined && x !== null;
  }

  protected handleError(msg: string): void {
    if (!environment.production) {
      alert(msg);
    } else {
      throw new Error(msg);
    }
  }
}
