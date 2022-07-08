import Form from "../../components/Form/Form";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import CenteredBody from "../../components/CenteredBody/CenteredBody";

function Login () {
    const block = "login-page";
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const headers = {
            'Content-Type': 'application/json'
        };

        const fetchConfig = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "login": {
                    "password": data.get("password"), 
                    "email": data.get("email")
                }
            })
        }
        fetch(`${process.env.REACT_APP_API_BASE_PATH}login/`, fetchConfig)
        .then((res) => {
            return res.json();
        }).then((res)=>{
            
            if (res.token) {
                sessionStorage.setItem("Auth",res.token);
                navigate("/dashboard");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logged In',
                    showConfirmButton: false,
                    timer: 1500
                });
            
            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Loggin Failed',
                    showConfirmButton: false,
                    timer: 1500,
                    showClass: {
                        icon: '' 
                    },
                });
            }
            
        });
    };


    return (  
    <CenteredBody>
        <section className={`${block}`}>
            
            <div className={`${block}__form-container`}>
                <form className={`${block}__form`} onSubmit = {handleSubmit}>
                    <h1>Login</h1>
                    <div className={`${block}__entry-container`}>
                        <label className={`${block}__entry-label`} htmlFor="email">Email</label>
                        <input className={`${block}__entry-input`} type="text" id="email" name="email" required/>
                    </div>
                    
                    <div className={`${block}__entry-container`}>
                        <label className={`${block}__entry-label`} htmlFor="password">Password</label>
                        <input className={`${block}__entry-input`} type="password" id="password" name="password" required/>
                    </div>
                    
                    <div className={`${block}__submit-container`}>
                        <button className={`${block}__submit-button`} type = "submit" name = "submit" value = "Submit">
                           Login
                        </button>
                    </div> 

                </form>
            </div>
        </section>
       
    </CenteredBody>  
    )
    
}

export default Login;