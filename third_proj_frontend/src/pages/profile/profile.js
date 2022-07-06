import Divider from "../../components/Divider/Divider";
import useFetch from "../../hooks/useFetch";

function Profile () {
    const block = "profile-page";
    const token = sessionStorage.getItem("Auth") || "";
    const [loadedDetails, setLoadedDetails] = useFetch(`${process.env.REACT_APP_API_BASE_PATH}user/` 
                                                    ,"GET",
                                                    {
                                                        Authorization: "Bearer "+ token
                                                    });
    
    console.log(loadedDetails);
    return (
        <section>   
            <h1>Profile</h1>
            <Divider/>

            <div className={`${block}__profile-card`}>
            {loadedDetails != null ?
                <>
                    <div className={`${block}__img-container`}>
                        <img className={`${block}__img`} src="/pixomatic_1572877263963.png"></img>
                        <h2 className={`${block}__img-title`}>
                            {loadedDetails.user.fullname}
                        </h2>
                    </div>
                    <div>
                        {loadedDetails.user.email}
                    </div>
                        
                    
                </>
                
                :
                <>Cargando</>
            }
            </div>
            
                
            
        </section>
    );
    
    
}

export default Profile;