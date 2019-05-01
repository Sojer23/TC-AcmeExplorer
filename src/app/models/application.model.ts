import {Entity} from './entity.model';

export class Application extends Entity{
    _id: string;
    status: string;
    paid: boolean;
    comments: string;
    explorerId: string;
    tripId: string;
    dateApplication: number;

    constructor(){
        super();
    }
}