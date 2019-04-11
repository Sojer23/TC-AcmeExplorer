import {Entity} from './entity.model';

export class Trip extends Entity{
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