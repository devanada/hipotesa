export interface IResponseSuccess<TData = any> {
  message: string;
  data: TData;
}

export interface IResponseFailed {
  message: string;
  reason: string;
}
