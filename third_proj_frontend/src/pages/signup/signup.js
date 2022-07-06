import Form from "../../components/Form/Form";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import CenteredBody from "../../components/CenteredBody/CenteredBody";

function Signup () {
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
                "signup": {
                    "password": data.get("password"), 
                    "fullname": data.get("fullname"), 
                    "email": data.get("email"),
                    "photoPath": data.get("profPicture"),
                    "sourceIncome": data.get("income")
                }
            })
        }
        fetch(`${process.env.REACT_APP_API_BASE_PATH }signup/`, fetchConfig)
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
            }
        });
    };

    return (
        <CenteredBody>
            <section>
                <h1>Sign up</h1>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" required/>
                    
                    <label for="profPicture">Choose a profile picture:</label>
                    <input type="file"
                        id="profPicture" name="profPicture"
                        accept="image/png, image/jpeg"/>
                    
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                    <label htmlFor="validatePassword">Confirm Password:</label>
                    <input type="password" id="validatePassword" name="validatePassword" required/>
                    <label htmlFor="fullname">Fullname:</label>
                    <input type="text" id="fullname" name="fullname" required/>
                    <label for="income">Income:</label>
                    <select name="income" id="income">
                        <option value="employed">Employed/Salaried</option>
                        <option value="business owner">Business Owner</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="retired">Retired</option>
                        <option value="investor">Investor</option>
                        <option value="other">Other</option>
                    </select>
                </Form>
            </section>
        </CenteredBody>
    );
}

export default Signup;