import React, { Fragment } from 'react';
import { Badge, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LoginForm } from '../_forms/login';
import { ReturnToTop } from './ReturnToTop';
import { compose, lifecycle, setStatic } from 'recompose';
import { CategoryReducerProps } from '../Item/store/categoryReducer';
import { getCategory } from '../Item/store/category';
import { connect } from 'react-redux';
import { UserReducerProps } from '../_forms/store/UserReducer';
import { Category } from '../Objects/Category';
import { logout } from '../_forms/store/login';
import { CartReducerProps } from '../Cart/store/cartReducer';
import { TextContainer } from './ObliqueContainer';
import { NavbarReducerProps } from './store/NavbarReducer';
import { updateNavbarPosition } from './store/navbar';
import { getCache, getCategories } from '../../helpers';

export interface ChildrenInterface {
    children: any;
}

interface Reducers {
    CartReducer: CartReducerProps;
    CategoryReducer: CategoryReducerProps;
    NavbarReducer: NavbarReducerProps;
    UserReducer: UserReducerProps;
}

const mapStateToProps = (reducers: Reducers) => ({
    categories: reducers.CategoryReducer.categories,
    isLogged: reducers.UserReducer.isLogged,
    position: reducers.NavbarReducer.position,
    cart: reducers.CartReducer.cart
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

const BNavbar: any = compose(
    connect(
        mapStateToProps,
        {
            getCategory,
            logout
        }
    ),
    setStatic(
        'fetching', ({ dispatch }: any) => [dispatch(getCategory())]
    ),
    lifecycle({
        componentDidMount() {
            if (0 === getCategories().length || null === getCache() || getCache() <= new Date()) {
                const {getCategory}: any = this.props;
                getCategory();
            }
        }
    })
)(({ cart, categories, fixed, isLogged, logout, position }: any) => (
    <Navbar
        bg={ (fixed && position > 30) ? 'light' : undefined }
        className="transitions"
        expand="lg"
        variant={ fixed ? position > 30 ? 'light' : 'dark' : 'light' }
        fixed={fixed ? 'top' : undefined}>
        <div className="container">
            <Navbar.Brand href="/">
                { process.env.REACT_APP_MARKETPLACE_NAME }
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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
                                    <Badge variant={'primary'} className="fs-100">{cart.totalItems}</Badge> Panier
                                </Nav.Link>
                                <NavDropdown alignRight title="Mon compte" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">
                                        <i className="fas fa-user-circle"/> Mon profil</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item className="text-danger" onClick={logout}>
                                        <i className="fas fa-sign-out-alt"/> Déconnexion</NavDropdown.Item>
                                </NavDropdown>
                            </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </div>
    </Navbar>
));

export const Footer: React.FunctionComponent = () => (
    <footer className="footer py-4">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4 text-center align-items-center d-flex order-md-1 py-2">
                    <span className="text-muted d-block m-auto">© { process.env.REACT_APP_MARKETPLACE_NAME } - {(new Date()).getFullYear()}</span>
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
                                brands.map((brand, index) => <a href={`https://${brand}.com`} key={index} className={`d-flex text-decoration-none text-muted fab fa-${brand} display-4`}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

const LayoutStateToProps = (reducers: Reducers) => ({
    position: reducers.NavbarReducer.position
});
export const Layout: any = compose(
    connect(
        LayoutStateToProps,
        {
            updateNavbarPosition
        }
    ),
    setStatic(
        'fetching', ({ dispatch }: any) => [dispatch(updateNavbarPosition(window.scrollY))]
    ),
    lifecycle({
        componentDidMount() {
            const { updateNavbarPosition }: any = this.props;
            window.addEventListener('scroll', () => {
                updateNavbarPosition(window.scrollY);
            })
        }
    })
)(({
    children,
    container,
    fixed,
    noPadding,
    position,
    textContainer
}: any) => (
    <Fragment>
        <main>
            <BNavbar fixed={fixed}/>
            <div className={noPadding ? '' : 'py-4'}>
                {
                    container ?
                        <div className="container">
                            {
                                textContainer ?
                                    <TextContainer>
                                        {children}
                                    </TextContainer> :
                                    children
                            }
                        </div> :
                        textContainer ?
                            <TextContainer>
                                {children}
                            </TextContainer> :
                            children
                }
            </div>
            <ReturnToTop isHidden={ !position || position < 50 }/>
        </main>
        <Footer/>
    </Fragment>
));
