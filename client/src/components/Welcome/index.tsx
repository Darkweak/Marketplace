import * as React from 'react';
import { Layout } from "../Common/Layout";
import { TextContainer } from "../Common/ObliqueContainer";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { ProductReducerProps } from "../Item/store/productReducer";
import { CategoryReducerProps } from "../Item/store/categoryReducer";
import { Category } from "../Objects/Category";
import { generateArticles, mapDispatchToProps } from "../Category/common";
import { Image } from "../Objects/Image";
import { BCarousel } from "../Carousel";

interface Reducers {
    CategoryReducer: CategoryReducerProps,
    ProductReducer: ProductReducerProps
}
const mapStateToProps = (reducers: Reducers) => ({
    categories: reducers.CategoryReducer.categories,
    products: reducers.ProductReducer.products
});

const images: Image[] = [
    ({
        name: 'Image 1',
        url: 'https://picsum.photos/id/1/800/1200'
    }),
    ({
        name: 'Image 2',
        url: 'https://picsum.photos/id/238/800/1200'
    }),
    ({
        name: 'Image 3',
        url: 'https://picsum.photos/id/239/800/1200'
    }),
    ({
        name: 'Image 4',
        url: 'https://picsum.photos/id/240/800/1200'
    }),
];

const generateCategories = (categories: Category[]) => {
  let items: any[] = [];
  categories.map((category: Category, index: number) =>
      items.push(
          <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 text-center categories-welcome">
              {category.name}
          </div>
      )
  );
  return items;
};

export const Welcome = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount(){
            let { getProduct }: any = this.props;
            getProduct('promotion=true');
        }
    })
)(({ categories, products }: any) => (
  <Layout noPadding>
    <BCarousel images={images}/>
    <TextContainer divider>
      <h1 className="text-center">
        Découvrez nos dernières promotions
      </h1>
      <div className="row m-0 py-2">
        {generateArticles(products, 3)}
      </div>
      <div className="text-right">
        <a href="/discount">
          Voir toutes les promotions en cours <i className="fas fa-arrow-circle-right"/>
        </a>
      </div>
    </TextContainer>
    <TextContainer divider secondary>
      <h1 className="text-center">
        Diverses catégories
      </h1>
      <div className="row m-0 py-2">
        {generateCategories(categories)}
      </div>
      <div className="text-right">
        <a href="/products">
          Voir tous les articles <i className="fas fa-arrow-circle-right"/>
        </a>
      </div>
    </TextContainer>
    <TextContainer>
      <h1 className="text-center">
        Un service de haut standing
      </h1>
      <div className="row m-0 pt-4">
        <div className="col-sm-12 col-md-4 py-2">
          <span className="display-1 d-block text-center"><i className="fas fa-truck"/></span>
          <h3 className="d-block text-center text-muted">Nous vous offrons la livraison jusque chez vous</h3>
        </div>
        <div className="col-sm-12 col-md-4 py-2">
          <span className="display-1 d-block text-center"><i className="fas fa-stopwatch"/></span>
          <h3 className="d-block text-center text-muted">Soyez livré en un temps record</h3>
        </div>
        <div className="col-sm-12 col-md-4 py-2">
          <span className="display-1 d-block text-center"><i className="fas fa-headset"/></span>
          <h3 className="d-block text-center text-muted">Une disponibilité de notre support 7j/7 24h/24</h3>
        </div>
      </div>
    </TextContainer>
  </Layout>
));
