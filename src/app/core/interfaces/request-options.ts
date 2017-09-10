export interface RequestOptions<T> {
  id?: string;
  data?: T;
  files?: {[key: string]: File[]};
  getParams?: {[key: string]: any};
  onSuccess?: (response?: any) => void;
  onError?: (response?: any) => void;
}
