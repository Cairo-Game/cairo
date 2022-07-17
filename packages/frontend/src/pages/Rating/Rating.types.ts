import { IUser } from "models/Entity/User";

export type TRating = {
    id: string;
    place: number;
    user: IUser;
    level: number;
    score: number;
};
