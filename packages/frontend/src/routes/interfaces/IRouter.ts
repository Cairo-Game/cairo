export interface IRoute {
    path: string;
    component?: JSX.Element;
    redirect?: string;
    children?: IRoute[];
}
