import { Route, Switch } from 'react-router';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import AdminPage from './pages/AdminPage';
import BasketPage from './pages/BasketPage';
import Header from './pages/Header';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegistrationPage from './pages/RegistrationPage';
import UserOrders from './pages/UserOrders';

function App() {
  return (
    <Container className="App">
      
        <Header />
        <Switch>
          <Route exact={true} strict={true} path="/user/orders">
            <UserOrders />
          </Route>
          <Route exact={true} strict={true} path="/login">
            <LoginPage />
          </Route>
          <Route exact={true} strict={true} path="/register">
            <RegistrationPage />
          </Route>
          <Route exact={true} strict={true} path="/admin">
            <AdminPage />
          </Route>
          <Route exact={true} strict={true} path="/">
            <MainPage />
          </Route>
          <Route exact={true} strict={true} path="/basket">
            <BasketPage />
          </Route>
          <Route exact={true} strict={true} path="/product/:id">
            <ProductDetailPage />
          </Route>
        </Switch>
    </Container>
  );
}

export default App;
