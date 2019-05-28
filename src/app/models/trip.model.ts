import {Entity} from './entity.model';
import { Picture } from './picture.model';

export class Trip extends Entity{
    status: string;
    ticker: string;
    title: string;
    description: string;
    cancelledReason: string;
    price: DoubleRange;
    dateInit: Date;
    dateEnd: Date;
    pictures: ArrayBuffer;
    stages: Stage[];
    comments: Comment[];
    totalStars: DoubleRange;
    mainPicture: string;
    photoObject: Picture;
}

class Stage {
    title: string;
    description: string;
    price: DoubleRange;
    dateInit: Date;
}

class Comment {
    title: string;
    commentText: string;
    stars: DoubleRange;
    author: string;
}