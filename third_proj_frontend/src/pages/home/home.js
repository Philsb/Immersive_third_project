import CenteredBody from "../../components/CenteredBody/CenteredBody";
import MainBody from "../../components/CenteredBody/CenteredBody";
import Footer from "../../components/Footer/Footer";


function Home () {
    const block = "home-page";
    return (
        <section className={`${block}`}>
            
            <div className={`${block}__main-container`}>
                <div>
                    <CenteredBody>
                        <div className={`${block}__hero`}>
                            <div>
                                <h1>New Way of Banking</h1>
                                <p>Check out our new app, the new way of banking has come here to stay.</p>
                            </div>
                            
                            <img src="/Screenshot 2022-07-07 170256.png"></img>
                        </div>
                    </CenteredBody>
                </div>
                <div className={`${block}__backdrop`}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>
                
                <div className={`${block}__services`}>
                    <CenteredBody>

                        <h2>Our Trusted Partners</h2>
                        <div  className={`${block}__services-container`}>
                            <img className={`${block}__image`} src="/logo_ice.png"></img>
                            <img className={`${block}__image`} src="/Logo_Tigo.svg.png"></img>
                            <img className={`${block}__image`} src="/Untitled-2.png"></img>
                            <img className={`${block}__image`} src="/1280px-Logo_de_la_Universidad_de_Costa_Rica.svg.png"></img>
                            <img className={`${block}__image`} src="/Claro.svg.png"></img>
                        </div>
                    
                    </CenteredBody>
                </div>
                <Footer/>
            </div>
                
        </section>
        
        );
}

export default Home;