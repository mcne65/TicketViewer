import React from 'react';
import './App.css';
import  LoginPage  from './components/LoginPage/LoginPage.ui'
import { ErrorPage } from './components/ErrorPage/ErrorPage.ui'
import { Header } from './components/Header/Header.ui'
import { connect } from 'react-redux'
import { ApplicationState } from './redux/state/ApplicationState'

interface IAppProps {
  isUserValid: boolean
}

class App extends React.Component<IAppProps>{
  public render (){
    console.log(this.props.isUserValid)
    return (
      <div className="App">
        <Header />
        {this.props.isUserValid ? null : <ErrorPage />}
        <LoginPage />
  
      </div>
    );
  }

}

function mapStateToProps({isUserValid}: ApplicationState){
  return {
    isUserValid
  }
}


export default connect(mapStateToProps)(App)
