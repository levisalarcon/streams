import React from 'react';
import { connect } from 'react-redux';
import { SignIn, SignOut } from '../actions'

class GoogleAuth extends React.Component {

    constructor(){
        super();
        this.auth = null;
    }

    componentDidMount(){
        window.gapi.load('client:auth2', this._initOAuthClient);
    }

    render() {
        return (
            <div>
                {this._renderIsSignedIn()}
            </div>
        )
    }

    _initOAuthClient = () => {
        window.gapi.client.init({
            'clientId': '1048341982019-tsp1n7c2t1b7por4j114stoajm056g6a.apps.googleusercontent.com',
            'scope': 'email'
        }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this._onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this._onAuthChange);
        })
    }

    _onAuthChange = isSignedIn => {
       if(isSignedIn)
            this.props.SignIn(this.auth.currentUser.get().getId())
        else    
            this.props.SignOut()
    }

    _signInClick = () => {
        this.auth.signIn();
    }

    _signOutClick = () => {
        this.auth.signOut();
    }

    _renderIsSignedIn() {
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button className="ui google plus button" onClick={this._signOutClick}>
                <i className="google plus icon"></i>
                    Sign Out
                </button>
                )
        }else{
            return (
                <button className="ui google plus button" onClick={this._signInClick}>
                <i className="google plus icon"></i>
                    Sign In
                </button>
                )
        }
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn}
}

export default connect(
    mapStateToProps,
    {SignIn, SignOut}) (GoogleAuth);
