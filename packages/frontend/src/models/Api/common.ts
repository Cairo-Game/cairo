export enum EStatusLoading {
    SUCCESS = 'SUCCESS',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR = 'ERROR',
}
export interface IRequestDataState<T = {}> {
    data?: T;
    status: EStatusLoading;
    errorMessage: string;
}
