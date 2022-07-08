import { useState, useEffect } from "react";
import { v1 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import useCart, {myCartState$} from "../../hooks/useCart";
import List from "../List/List";
import LoginModal from "../LoginModal/LoginModal";
import Swal from "sweetalert2";



const Header = (props) => {
    const navigate = useNavigate();
    const block = "header";
    const token = sessionStorage.getItem("Auth") || null;
    const {logo, companyName,lettersLogoSrc} = props;

    const handleLogout = () => {
        sessionStorage.removeItem("Auth");
        Swal.fire({
            position: 'center',
            title: 'Logged Out ',
            timer: 1500
        });
        navigate("/");
    }
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

                        {
                            token ? 
                            <button className="anchor-list-h__anchor" onClick={handleLogout}>Logout</button>
                            :
                            <>
                                <Link className="anchor-list-h__anchor" to="Login">Login</Link>
                                <Link className="anchor-list-h__anchor" to="Signup">Signup</Link>
                            </>
                            
                            
                            
                        }
                        
                    </List>
                </div>
                                            
            </nav>
        </header>
    );

}


export default Header;
