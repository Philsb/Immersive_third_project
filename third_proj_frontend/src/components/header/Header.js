import { useState, useEffect } from "react";
import { v1 } from "uuid";
import { Link } from "react-router-dom";
import useCart, {myCartState$} from "../../hooks/useCart";
import List from "../List/List";
import LoginModal from "../LoginModal/LoginModal";



const Header = (props) => {
    const block = "header";
    const {logo, shoppingCart,companyName,lettersLogoSrc,links} = props;
 
    const finalLinks = <></>;
    return (
        <header>
            <nav className={block}>

                <div  className={`${block}__logo-container`}>
                    <Link  aria-label={"Go main page"} className={`${block}__logo-container`} to ="/">
                        <img className={`${block}__logo`} src={logo.src} alt={logo.alt}/>
                        <img className={`${block}__logo-letters`} src={lettersLogoSrc} alt={companyName}/>
                    </Link>
                    
                </div>
                <div className={`${block}__links-container`}>
                    <List  className="anchor-list-h">
                        {finalLinks}
                        
                    </List>
                    <LoginModal/>
                </div>
                                            
            </nav>
        </header>
    );

}


export default Header;
