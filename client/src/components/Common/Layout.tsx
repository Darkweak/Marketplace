import * as React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import { LoginForm } from '../_forms/login';
import { ReturnToTop } from './ReturnToTop';
import { compose, lifecycle } from 'recompose';
import { CategoryReducerProps } from '../Item/store/categoryReducer';
import { getCategory } from '../Item/store/category';
import { connect } from 'react-redux';
import { UserReducerProps } from '../_forms/store/UserReducer';
import { Category } from '../Objects/Category';
import { logout } from '../_forms/store/login';

export interface ChildrenInterface {
    children: any;
}

interface Reducers {
    CategoryReducer: CategoryReducerProps;
    UserReducer: UserReducerProps;
}
const mapStateToProps = (reducers: Reducers) => ({
    categories: reducers.CategoryReducer.categories,
    isLogged: reducers.UserReducer.isLogged
});
const mapDispatchToProps = (dispatch: (args?: any) => void) => ({
    getCategory: () => dispatch(getCategory()),
    logout: () => dispatch(logout()),
});

const brands = [
  'instagram',
  'facebook',
  'twitter'
];

export const generateCategories = (categories: Category[]) => {
  const items: any[] = [];
  categories.map((category: Category, index: number) => items.push(
      <div key={index} className="col-6 text-center categories-navbar">
          <NavDropdown.Item href={`/categories/${category.name}`} className="text-center pb-2">
              {category.name}
          </NavDropdown.Item>
      </div>
  ));
  return items;
};

const BNavbar = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount() {
            const { getCategory }: any = this.props;
            getCategory();
        }
    })
)(({ categories, isLogged, logout }: any) => (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                Marketplace
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Accueil</Nav.Link>
                    <Nav.Link href="/discount" className="position-relative">Promos</Nav.Link>
                    <NavDropdown title="Catégories" id="navbar-dropdown">
                        <NavDropdown.Item href="/products" id="categories-dropdown" className="text-center pb-2">
                            Voir tous les articles <i className="fas fa-arrow-circle-right"/>
                        </NavDropdown.Item>
                        <div className="row m-0">
                            {generateCategories(categories)}
                        </div>
                    </NavDropdown>
                </Nav>
                <Nav className="my-2 my-lg-0">
                    {
                        !isLogged ?
                            <NavDropdown alignRight title="Connexion" id="basic-nav-dropdown">
                                <div className="p-2 min-width-20">
                                    <LoginForm/>
                                </div>
                            </NavDropdown> :
                            <React.Fragment>
                                <Nav.Link href="/cart">
                                    <i className="fas fa-shopping-cart position-relative"/> Panier
                                </Nav.Link>
                                <NavDropdown alignRight title="Mon compte" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">
                                        <i className="fas fa-user-circle"/> Mon profil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="text-danger" onClick={logout}>
                                        <i className="fas fa-sign-out-alt"/> Déconnexion</NavDropdown.Item>
                                </NavDropdown>
                            </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
));

const Footer: React.FunctionComponent = () => (
  <footer className="footer py-4">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-4 text-center align-items-center d-flex order-md-1 py-2">
          <span className="text-muted d-block m-auto">© MARKETPLACE - {(new Date()).getFullYear()}</span>
        </div>
        <div className="col-sm-12 col-md-4 order-md-0 py-2">
          <div className="align-items-center row m-0 h-100">
            <div className="m-auto">
              <a href="/cgu" className="d-block text-muted text-decoration-none">Conditions générales</a>
              <a href="/about" className="d-block text-muted text-decoration-none">À propos</a>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 text-center order-md-2 py-2">
          <div className="align-items-center row m-0 h-100">
            <span className="text-muted col-sm-12">Restons en contact</span>
            <div className="col-sm-12 d-flex justify-content-around">
              {
                brands.map((brand, index) => <i key={index} className={`fab fa-${brand} display-4`} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

interface LayoutProps {
  children: any;
  container?: boolean;
  noPadding?: boolean;
}
export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  container,
  noPadding
}: LayoutProps) => (
  <React.Fragment>
    <main>
      <BNavbar/>
      <div className={noPadding ? '' : 'py-4'}>
        {
          container ?
            <Container>
              { children }
            </Container> :
            children
        }
      </div>
      <ReturnToTop/>
    </main>
    <Footer/>
  </React.Fragment>
);
Layout.defaultProps = {
  container: false,
  noPadding: false
};
