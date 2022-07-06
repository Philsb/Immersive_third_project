import { Link } from "react-router-dom";

const LoginModal = (props) => {
    const block = "login-modal";
    const {isLoggedIn, linkToLogIn, linkToSignUp} = props;
    return (
        <div className={`${block}`}>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
        </div>
    );

}

export default LoginModal;