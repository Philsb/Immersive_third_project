import React from 'react'
import CardWrapper from './CardWrapper';

const AccountCard = (props) => {
    const block = "account-card";
    const {accountNumber, balance, currencyType} = props;
    return (
        <CardWrapper title={accountNumber}>
            <div className={`${block}__root`}>   
                <p className={`${block}__currency`}>{currencyType}</p>
                <p className={`${block}__balance`}>{balance}</p>
            </div>
        </CardWrapper>
    )
}

export default AccountCard;