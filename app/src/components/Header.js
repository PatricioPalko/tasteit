import React, {useState} from "react";
import bg from '../img/bg.jpg'
import Facebook from "./Facebook";

const Header = () => {

        const [pretitle, setPretitle] = useState('react app');

        const handleFacebookLogin = (data) => {
            setPretitle(data);
        };

        return (
            <div>
                <div className="tpl__mainHeader">
                    <div className="tpl" style={{backgroundImage: `url(${bg})`}}>
                        <div className="bg"></div>
                        <div className="container-medium">
                            <div className="row">
                                <div className="grid-xs-24">
                                    <div className="comp__heading">
                                        <span>{pretitle}</span>
                                        <h1>Taste IT</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Facebook onFacebookLogin={handleFacebookLogin}/>
                    </div>
                </div>
            </div>
        )
    }



export default Header