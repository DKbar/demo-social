import React, { Suspense } from 'react';
import './App.css';
import News from './components/News/News';
import { /* BrowserRouter,  */HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/redux-store';


//import DialogsContainer from './components/Dialogs/DialogsContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

     
type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component <MapStatePropsType & MapDispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <NavbarContainer />
        <Suspense fallback={<Preloader />}>
          <div className="app-wrapper-content">
            <Switch>
              <Route exact path='/'
                render={() => <Redirect to={'/Profile'} />} />
              <Route path='/dialogs'
                render={() => <DialogsContainer />} />
              <Route path='/profile/:userId?'
                render={() => <ProfileContainer />} />
              <Route path='/news' render={() => <News />} />
              <Route path='/music' render={() => <Music />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/settings' render={() => <Settings />} />
              <Route path='/login' render={() => <Login />} />
              <Route path='*' render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </div>
        </Suspense>
      </div>


    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  }
}

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);


const MainApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store} >
      <AppContainer />
    </Provider>
  </HashRouter>
};

export default MainApp;

/* return <React.StrictMode>
<BrowserRouter>
  <Provider store={store} >
    <AppContainer />
  </Provider>
</BrowserRouter>
</React.StrictMode>
}; */