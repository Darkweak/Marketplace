import * as React from 'react';
import { Layout } from "../Common/Layout";
import { TextContainer } from "../Common/ObliqueContainer";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { ProductReducerProps } from "../Item/store/productReducer";
import { CategoryReducerProps } from "../Item/store/categoryReducer";
import { Category } from "../Objects/Category";
import { generateArticles, mapDispatchToProps } from "../Category/common";

interface Reducers {
    CategoryReducer: CategoryReducerProps,
    ProductReducer: ProductReducerProps
}
const mapStateToProps = (reducers: Reducers) => ({
    categories: reducers.CategoryReducer.categories,
    products: reducers.ProductReducer.products
});

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

const services = [
    {
        logo: 'truck',
        description: 'Nous vous offrons la livraison jusque chez vous'
    },
    {
        logo: 'stopwatch',
        description: 'Soyez livré en un temps record'
    },
    {
        logo: 'headset',
        description: 'Une disponibilité de notre support 7j/7 24h/24'
    },
]

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
  <Layout noPadding fixed>
      <video autoPlay muted loop className="w-100 vh-100 background-video bg-black-30 img-fluid w-100 img-fit">
          <source src="/background.mp4"/>
      </video>
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
          {
              services.map((service, index) => (
                  <div key={index} className="col-sm-12 col-md-4 py-2">
                      <span className="display-1 d-block text-center"><i className={`fas fa-${service.logo}`}/></span>
                      <h3 className="d-block text-center text-muted">{service.description}</h3>
                  </div>
              ))
          }
      </div>
    </TextContainer>
  </Layout>
));
