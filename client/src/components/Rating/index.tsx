import React from 'react';
import { Card, Feed, Rating } from 'semantic-ui-react';
import '../Rating/rating.scss';

const sentences = [
    `Le service est vraiment au top`,
    `Je recommande vivement ${process.env.REACT_APP_MARKETPLACE_NAME} pour leur professionalisme et leur réactivité`,
    `Commande livrée 2 jours après le paiement, super !`,
    `Je n'ai jamais commandé mais leur magasin est très bien fourni`,
    `Un seul mot, j'adore`,
]

interface RatingProps {
    nbStars?: number;
    minimum?: number;
}
export const BRating = ({ minimum = 1, nbStars = 5 }: RatingProps) => {
    return (
        <Rating icon='heart' defaultRating={Math.floor(Math.random() * nbStars) + minimum} maxRating={nbStars} disabled />
    );
};

const ratingFactory = () => {
    let items: any[] = [];
    sentences.map((sentence, index) => (
        items.push(
            <div key={index} className="col-md-4 col-12 slide">
                <Card className="w-100 h-100">
                    <Card.Content className="h-100">
                        <Feed.Event className="d-flex h-100">
                            <Feed.Label className="pr-3" image='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                            <Feed.Content className="row m-0">
                                <Feed.Summary className="pr-3 co12">
                                    { sentence }
                                </Feed.Summary>
                                <Feed.Summary className="mt-auto co12 pt-2">
                                    <BRating minimum={3}/>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Card.Content>
                </Card>
            </div>
        )
    ));

    return items;
};

export const AutoplayInfinite = () => (
    <div className="slider">
        <div className="slide-track py-2">
            {
                ratingFactory().map(rating => rating)
            }
        </div>
    </div>
);
