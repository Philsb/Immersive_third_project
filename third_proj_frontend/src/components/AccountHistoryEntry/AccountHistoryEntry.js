import React from 'react'
import Divider from '../Divider/Divider';

const AccountHistoryEntry = (props) => {
    const block = "account-history-entry";
    const {originAccount, destinationAccount, amount, date ,description}  = props;
    return (
        <div className={`${block}`}>
            <div className={`${block}`}>
                <i className='fa fa-exchange'></i>
            </div>
            <div>
                <div className={`${block}__details`}>
                    <div className={`${block}__cell`}>
                        <div className={`${block}__cell-title`}>{originAccount}</div>
                        <div className={`${block}__cell-content`}>Origin</div>
                    </div>

                    <div className={`${block}__cell`}>
                        <div className={`${block}__cell-title`}>{destinationAccount}</div>
                        <div className={`${block}__cell-content`}>Destination</div>
                    </div>

                    <div className={`${block}__cell`}>
                        <div className={`${block}__cell-title`}>{amount}</div>
                        <div className={`${block}__cell-content`}>Amount</div>
                    </div>

                    <div className={`${block}__cell`}>
                        <div className={`${block}__cell-title`}>{date}</div>
                        <div className={`${block}__cell-content`}>Date</div>
                    </div>
                </div>
                <div className={`${block}__description-container`}>
                    <div className={`${block}__cell`}>
                        <div className={`${block}__cell-description`}>{description}</div>
                    </div> 
                </div>
            </div>
            
        </div>
        
    )
}

export default AccountHistoryEntry;