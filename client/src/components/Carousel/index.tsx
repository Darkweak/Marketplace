import * as React from 'react';
import {
  Carousel
} from 'react-bootstrap';
import { Image } from "../Objects/Image";

interface BCarouselProps {
  images: Image[]
}
export const BCarousel: React.FunctionComponent<BCarouselProps> = ({images}) => (
  <Carousel>
    {
      images.map((image: Image, index: number) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-fluid"
            src={image.url}
            alt={image.name}
          />
        </Carousel.Item>
      ))
    }
  </Carousel>
);
