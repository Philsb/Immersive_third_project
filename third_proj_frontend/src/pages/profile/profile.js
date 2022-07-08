import Divider from "../../components/Divider/Divider";
import Loading from "../../components/Loading/Loading";
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

            
            {loadedDetails != null ?
                <div className={`${block}__profile-card`}>
                    <div className={`${block}__img-container`}>
                        <img className={`${block}__img`} src={loadedDetails.user.photo_path}></img>
                        <h2 className={`${block}__img-title`}>
                            {loadedDetails.user.fullname}
                        </h2>
                        
                    </div>
                    <div >
                        <div  className={`${block}__details-container`}>
                            <div className={`${block}__details`}>
                                <div className={`${block}__details-entry`} >
                                    <h3>Email</h3>
                                    <p>{loadedDetails.user.email}</p>
                                </div>

                                <div className={`${block}__details-entry`} >
                                    <h3>Id</h3>
                                    <p>{loadedDetails.user.user_id}</p>
                                </div>

                                <div className={`${block}__details-entry`} >
                                    <h3>Source of Income</h3>
                                    <p>{loadedDetails.user.source_income}</p>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                        
                    
                </div>
                
                :
                <Loading/>
            }
            
            
                
            
        </section>
    );
    
    
}

export default Profile;