import * as React from 'react';
import { Layout } from "../Common/Layout";
import { TextContainer } from "../Common/ObliqueContainer";
import { compose, lifecycle, setStatic } from 'recompose';
import { connect } from "react-redux";
import { ProductReducerProps } from "../Item/store/productReducer";
import { CategoryReducerProps } from "../Item/store/categoryReducer";
import { Category } from "../Objects/Category";
import { generateArticles, mapDispatchToProps } from '../Category/common';
import { AutoplayInfinite } from '../Rating';
import { getProduct } from '../Item/store/product';

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
          <a href={`/categories/${category.name}`} key={index} className="col-6 col-sm-4 col-md-3 col-lg-3 py-2 text-center text-decoration-none">
              <div className="card p-2 shadow-sm card-categories">
                  {category.name}
              </div>
          </a>
      )
  );
  return items;
};

export const Welcome = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    setStatic(
        'fetching', ({ dispatch }: any) => [dispatch(getProduct('promotion=true'))]
    ),
    lifecycle({
        componentDidMount(){
            const { getProduct }: any = this.props;
            getProduct('');
        }
    })
)(({ categories, products }: any) => (
  <Layout noPadding fixed>
      <video autoPlay muted loop className="w-100 vh-100 background-video bg-black-30 img-fluid w-100 img-fit">
          <source src="https://i.imgur.com/Ao2i4Wj.mp4"/>
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
        Votre satisfaction est notre priorité
      </h1>
      <div className="row m-0 pt-4">
          <AutoplayInfinite/>
      </div>
    </TextContainer>
  </Layout>
));
