import List from "../../components/List/List";
import Modal from "../../components/Modal/Modal";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";

const Services = ()=> {
    
    const token = sessionStorage.getItem("Auth") || "";
    const [loadedServices,setLoadedServices] = useFetch (`${process.env.REACT_APP_API_BASE_PATH}services/`,"GET");
    const [subscribedServices, setSubscribedServices] = useFetch (`${process.env.REACT_APP_API_BASE_PATH}services/subscription/`,"GET",{"Authorization": "Bearer "+token});
    const [userAccounts,setUserAccounts] = useFetch (`${process.env.REACT_APP_API_BASE_PATH}account/`,"GET",{"Authorization": "Bearer "+token})

    const handleSubscribe= (serviceId)=> {
        
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
        };

        const fetchConfig = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "subscriptionData": {
                    "accountNumber": userAccounts[0].account_number,
                    "serviceId": serviceId,
                    "recurrentPayment": false
                }
            })
        } 
        
        fetch (`${process.env.REACT_APP_API_BASE_PATH}services/subscription/`, fetchConfig)
        .then(res=>{
            return res.json();
        }).then (res=>{
            if (res.account_number_fk) {
                subscribedServices.push(res);
                setSubscribedServices([...subscribedServices]);
            };
        });

    }  

    const handleUnsubscribe = (accountNumber, serviceId) => {
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
        };

        const fetchConfig = {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify({
                "subscriptionData": {
                    "accountNumber": accountNumber,
                    "serviceId": serviceId,
                }
            })
        } 
        
        fetch (`${process.env.REACT_APP_API_BASE_PATH}services/subscription/`, fetchConfig)
        .then(res=>{
            return res.json();
        }).then (res=>{
            //If deleted account
            if (res.account_number_fk ){
                
                //Delete from subscribed services
                setSubscribedServices(subscribedServices.filter(subscription => {
                    let should_filter = !(subscription.account_number_fk == res.account_number_fk && subscription.service_id_fk == res.service_id_fk);
                    return should_filter;
                }))
            }
        });
    }

    return (
    
    <section>
    <h1>Services</h1>
    <h2>Available services</h2>
        <List>
            {loadedServices ? 
                loadedServices.map(service=>{
                    return (<div>
                        {service.description}
                        CRC {service.base_price}
                        <button onClick={()=>{handleSubscribe(service.user_id)}}>Subscribe</button>
                    </div>);
                })
                : 
                <></>
            }
        </List>
        
        
    <h2>Subscribed services</h2>

        <List>
            {subscribedServices ? 
                subscribedServices.map(subscription=>{
                    return (
                    <div>
                        {subscription.description}
                        {generateIBAN( subscription.account_number_fk)}
                        {subscription.debt_amount}
                        {subscription.last_payed}
                        <button onClick={()=>{handleUnsubscribe(subscription.account_number_fk, subscription.user_id)}}>Delete Subscription</button>
                    </div>);
                })
                : 
                <></>
            }
        </List>
    </section>);


}

export default Services;