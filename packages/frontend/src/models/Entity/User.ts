export interface IUser {
    firstName: string,
    secondName: string,
    displayName: string,
    login: string,
    email: string,
    password?: string,
    phone: string,
    avatar?:string,
    id?:number
}