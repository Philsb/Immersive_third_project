import React from 'react'

const ServiceCard = (props) => {
    const block = "service-card";
    const {serviceName, serviceType, basePrice, subTimePerMinute, handleSubscription} = props;
    return (
        <div className={`${block}__container`}>

            <div className={`${block}__title-container`}>
                <div className={`${block}__title`} >{serviceName}</div>
                <div className={`${block}__type`} >{serviceType}</div>
                <div className={`${block}__pricing`} >{`${basePrice.split("₡")[1]} CRC per minute`}</div>
            </div>
            <button onClick = {handleSubscription} className={`${block}__pay-container`}>
                <div>Subscribe</div>
                <i className={"fa fa-chevron-right"}/>
            </button>
        </div>
    )
}

export default ServiceCard