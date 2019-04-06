import {Entity} from './entity.model';

export class Actor extends Entity{
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

    constructor(){
        super();
    }
}