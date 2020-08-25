import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component {

        state = {
            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',
            picture: ''
        };



    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    };

    componentClicked = () => console.log('clicked');

    render() {
        let fbContent;

        if(this.state.isLoggedIn) {
            fbContent = (
                <div>
                    {/*{this.props.onFacebookLogin(this.state.name)}*/}
                    {console.log(this.state.name)}
                    {this.props.onFacebookLogin(this.state.name)}
                    <img src={this.state.picture} alt={this.state.name} className="photo"/>
                </div>
            );

        } else {
            fbContent = (
                <FacebookLogin
                    appId="419783042315223"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            )
        }

        return (
            <div className="comp__facebookLogin">
                {fbContent}
            </div>
        );
    }
}

export default Facebook;