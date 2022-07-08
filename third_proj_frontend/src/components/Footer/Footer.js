import List from "../List/List";

const Footer = (props)=>{
    const block = "footer";
    const {children} = props;

    return (
        <footer className={`${block}`}>
            <section className = {`${block}__container`}>
                <div className = {`${block}__logo-container`}>
                    <h2>Alfa Bank </h2>
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
            </section>
            
        </footer>
       
    );
};

export default Footer;