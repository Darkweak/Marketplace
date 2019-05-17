import React from 'react';
import { Card, Feed, Rating } from 'semantic-ui-react';
import '../Rating/rating.scss';

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
    for (let i = 0; i < 13; i++) {
        items.push(
            <div className="p-3">
                <Card>
                    <Card.Content>
                        <Feed.Event className="d-flex">
                            <Feed.Label className="pr-3" image='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                            <Feed.Content>
                                <Feed.Summary>
                                    You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                                </Feed.Summary>
                                <Feed.Summary>
                                    <BRating minimum={3}/>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Card.Content>
                </Card>
            </div>
        )
    }

    return items;
};

export const AutoplayInfinite = () => (
    <div className="slider">
        <div className="slide-track">
            {
                ratingFactory().map(rating => rating)
            }
        </div>
    </div>
);
