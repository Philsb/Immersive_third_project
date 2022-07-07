import List from "../List/List";

const Footer = (props)=>{
    const block = "footer";
    const {children} = props;

    return (
        <footer className={`${block}`}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
            <section className = {`${block}__container`}>
                <div className = {`${block}__logo-container`}>
                    <h2>Indie Rocket </h2>
                    <img className={`${block}__logo`} src="/Icons/drawing.svg" alt=""/>
                </div>
                
                <div className={`${block}__link-container`}>
                    <div className={`${block}__links`}>
                        <h3>Languages</h3>
                        <List className={`${block}__list`}>
                        
                            <a href="#" aria-label="Change to English Language">English</a>
                            <a href="#" aria-label="Change to Spanish Language">Spanish</a>
                            <a href="#" aria-label="Change to German Language">German</a>
                            <a href="#" aria-label="Change to French Language">French</a>
                        </List>
                    </div>
                     
                    <div className={`${block}__links`}>
                        <h3>Manage Acount</h3>
                        <List className={`${block}__list`}>
                        
                            <a href="#" aria-label="Login">Login</a>
                            <a href="#" aria-label="Go to settings">Settings</a>
                            <a href="#" aria-label="Go to Subscribe">Subscribe</a>
                            <a href="#" aria-label="Go to my games">My Games</a>
                        </List>
                    </div>

                </div>
                <div className="footer__copyright">
                <span>
                    © Copyright Indie Rocket Inc. All rights reserved.
                </span>
                </div>
            </section>
            
        </footer>
       
    );
};

export default Footer;