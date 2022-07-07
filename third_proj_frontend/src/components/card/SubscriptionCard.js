import React from 'react'

const SubscriptionCard = (props) => {
    const block = "subscription-card";
    const {serviceName,debt} = props;
    return (
        <div className={`${block}__container`}>

            <div className={`${block}__title-container`}>
                <div className={`${block}__title`} >{serviceName}</div>

                <div className={`${block}__debt`} >{debt.split("₡")[1]} CRC in debt</div>
            </div>
            <button className={`${block}__pay-container`}>
                <div>Pay service</div>
                <i className={"fa fa-chevron-right"}/>
            </button>
        </div>
    );
}

export default SubscriptionCard;