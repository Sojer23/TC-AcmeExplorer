import {Entity} from './entity.model';
import { Picture } from './picture.model';

export class Actor extends Entity{
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone: number;
    address: string;
    password: string;
    preferredLanguage: string;
    role: string;
    banned: boolean;
    flatRatePaid: boolean;
    finderId: object;
    customToken: string;
    photo: string;
    photoObject: Picture;
    constructor(){
        super();
    }
}