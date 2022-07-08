import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServiceCard from "../../components/card/ServiceCard";
import SubscriptionCard from "../../components/card/SubscriptionCard";
import FlexContainer from "../../components/Container/FlexContainer";
import WrapContainer from "../../components/Container/WrapContainer";
import List from "../../components/List/List";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";

const Services = ()=> {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("Auth") || "";
    const [loadedServices,setLoadedServices] = useFetch (`${process.env.REACT_APP_API_BASE_PATH}services/`,"GET");
    const [subscribedServices, setSubscribedServices] = useFetch (`${process.env.REACT_APP_API_BASE_PATH}services/subscription/`,"GET",{"Authorization": "Bearer "+token});
    const [userAccounts,setUserAccounts] = useFetch (`${process.env.REACT_APP_API_BASE_PATH}account/`,"GET",{"Authorization": "Bearer "+token})
    
    const getFirstColonesAccount = () =>{
        return userAccounts.find(account => account.type_name == "colones");
    }
    const handleSubscribe= (serviceId)=> {
        console.log(userAccounts);
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
        };

        const fetchConfig = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "subscriptionData": {
                    "accountNumber": getFirstColonesAccount().account_number,
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
    
    const handlePayService = (serviceId, accountNumber,debt, serviceName)=>{
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
        };

        const fetchConfig = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "payData": {
                    "accountNumber": accountNumber,
                    "serviceId": serviceId,
                    "amount": debt,
                    "description": "Payed Service: " + serviceName
                }
            })
        } 
        
        fetch (`${process.env.REACT_APP_API_BASE_PATH}services/pay`, fetchConfig)
        .then(res=>{

            if (res.status == 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Payed service.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate ("");

            }
            if (res.status != 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Not enough money in main account.',
                    showConfirmButton: false,
                    timer: 1500
                });

            }

            return res.json();
        }).then (res=>{
            console.log(res)
        });
    }
    return (
    
    <section>
    <h1>Services</h1>
    <h2>Available services</h2>
        <WrapContainer>
            {loadedServices ? 
                loadedServices.map(service=>{
                    const subtime =  (service.sub_time.hours ? service.sub_time.hours : 0 )*60 + (service.sub_time.minutes ? service.sub_time.minutes : 0) + (service.sub_time.seconds ? service.sub_time.seconds : 0 ) * (1/60)
                    return (
                    <ServiceCard
                        serviceName = {service.provider_name}
                        serviceType = {service.service_type}
                        handleSubscription = {()=>{handleSubscribe(service.user_id)}}
                        basePrice = {service.base_price}
                        subTimePerMinute = {subtime .toFixed(2)}
                    />
                    /*{<div>
                        {service.provider_name}
                        {service.service_type}
                        CRC {service.base_price}
                        <button onClick={()=>{handleSubscribe(service.user_id)}}>Subscribe</button>
                    </div>}*/
                    
                    );
                })
                : 
                <Loading/>
            }
        </WrapContainer>
        
        
    <h2>Subscribed services</h2>

        <List>
            {subscribedServices ? 
                subscribedServices.map(subscription=>{
                    
                    return (
                    <SubscriptionCard
                        serviceName = {subscription.provider_name}
                        debt = {subscription.debt_amount}
                        handlePayService = {()=>{handlePayService(subscription.user_id, subscription.account_number_fk, subscription.debt_amount, subscription.provider_name)}}
                    />
                    );
                    /*return (
                    <div>
                        {subscription.provider_name}
                        {generateIBAN( subscription.account_number_fk)}
                        {subscription.debt_amount}
                        {subscription.last_payed}
                        <button onClick={()=>{handleUnsubscribe(subscription.account_number_fk, subscription.user_id)}}>Delete Subscription</button>
                    </div>);*/
                })
                : 
                <Loading/>
            }
        </List>
    </section>);


}

export default Services;