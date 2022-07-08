import Form from "../../components/Form/Form";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import CenteredBody from "../../components/CenteredBody/CenteredBody";
import { useState } from "react";

function Signup () {
    const navigate = useNavigate();
    const block = "signup-page";
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dx4qfildd/upload";
    const [hasLoadedImage,setHasLoadedImage] = useState(false);
    const [imageURL,setImageURL] = useState(null);
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
                    "photoPath": imageURL,
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
                navigate("/login");
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

    const handleImageChange = (e)=>{
        setHasLoadedImage(false);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file",file);
        data.append("upload_preset", "mhtnmbm6");
        fetch (cloudinaryURL, {
            method: "POST",
            body:data
        }).then ((res) => {
            return res.json()
        }).then ((res)=>{
            if (res.secure_url != undefined){
            
                setImageURL(res.secure_url);
                setHasLoadedImage(true);
            }
        });
    }

    return (
        <CenteredBody>
            <section className={`${block}`}>
                <div className={`${block}__form-container`}>
                    <form className={`${block}__form`} onSubmit = {handleSubmit}>
                        <h1>Sign up</h1>
                        <div className={`${block}__entry-container`}>
                            <label className={`${block}__entry-label`} htmlFor="email">Email:</label>
                            <input className={`${block}__entry-input`} type="text" id="email" name="email" required/>
                        </div>

                        <div className={`${block}__entry-container`}>
                            <label className={`${block}__entry-label`} htmlFor="profPicture">Choose a profile picture:</label>
                            <input onChange = {handleImageChange} className={`${block}__entry-input`} type="file"
                                id="profPicture" name="profPicture"
                                accept="image/png, image/jpeg"/>
                            
                            
                            {
                                hasLoadedImage ?
                                <div className={`${block}__img-container`}>
                                    <img className={`${block}__img`} src={imageURL}/>
                                </div>
                                
                                :
                                <></>
                            }
                        </div>
                        <div className={`${block}__entry-container`}>
                            <label className={`${block}__entry-label`} htmlFor="fullname">Fullname:</label>
                            <input className={`${block}__entry-input`} type="text" id="fullname" name="fullname" required/>
                        </div>

                        <div className={`${block}__entry-container`}>
                            <label className={`${block}__entry-label`} htmlFor="income">Income:</label>
                            <select className={`${block}__entry-input`} name="income" id="income">
                                <option value="employed">Employed/Salaried</option>
                                <option value="business owner">Business Owner</option>
                                <option value="self-employed">Self-Employed</option>
                                <option value="retired">Retired</option>
                                <option value="investor">Investor</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={`${block}__entry-container`}>
                            <label className={`${block}__entry-label`} htmlFor="password">Password:</label>
                            <input className={`${block}__entry-input`} type="password" id="password" name="password" required/>
                        </div>

                        <div className={`${block}__entry-container`}>
                            <label className={`${block}__entry-label`} htmlFor="validatePassword">Confirm Password:</label>
                            <input className={`${block}__entry-input`} type="password" id="validatePassword" name="validatePassword" required/>
                        </div>
                        <div className={`${block}__submit-container`}>
                            <button className={`${block}__submit-button`} type = "submit" name = "submit" value = "Submit">
                            Signup
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </CenteredBody>
    );
}

export default Signup;