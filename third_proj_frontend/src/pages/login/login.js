import Form from "../../components/Form/Form";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import CenteredBody from "../../components/CenteredBody/CenteredBody";

function Login () {
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
                navigate("/");
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
                    timer: 1500
                });
            }
            
        });
    };


    return (  
    <CenteredBody>
        <section>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>
            </Form>
        </section>
       
    </CenteredBody>  
    )
    
}

export default Login;