import React from 'react'
import generateIBAN from '../../helpers/generateIban';
import Form from './Form';

const TransferMoneyForm = (props) => {
    const block = "transfer-money-form";
    const {handleTransfer, handleSelectChange, selectElementRef, amountInput ,loadedAccounts, selectedAccountType, isReceivingMoney} = props;
    return (
      <div className={`${block}__form-container`}>
        <form className={`${block}__form`} onSubmit = {handleTransfer}>
            
            <div className={`${block}__entry-container`}>

				{isReceivingMoney ?
					<>
						<label className={`${block}__entry-label`} htmlFor="originAccount">Origin</label>
                		<input className={`${block}__entry-input`} type="text" id="originAccount" name="originAccount" required/>
					</>
					:
					<>
						<label className={`${block}__entry-label`} htmlFor="originAccount">Origin</label>
						<select className={`${block}__entry-input`} onChange={handleSelectChange} ref={selectElementRef} name="originAccount" id="originAccount">

							{loadedAccounts.map((account)=>{
								return <option value={account.account_number}>{generateIBAN(account.account_number)}</option>
							})}
						</select>
					</>
				}
                
            </div>
            
            
            <div className={`${block}__entry-container`}>
				{
					isReceivingMoney ?
					<>
						<label className={`${block}__entry-label`} htmlFor="destination">Destination</label>
						<select className={`${block}__entry-input`} onChange={handleSelectChange} ref={selectElementRef} name="destination" id="destination">

							{loadedAccounts.map((account)=>{
								return <option value={account.account_number}>{generateIBAN(account.account_number)}</option>
							})}
						</select>
					</> 
					:
					<>
						<label className={`${block}__entry-label`} htmlFor="destination">Destination</label>
                		<input className={`${block}__entry-input`} type="text" id="destination" name="destination" required/>
					</>
				}
                
            </div>
            
            <div className={`${block}__entry-container`}>
                <label className={`${block}__entry-label`} htmlFor="amount">Amount in {selectedAccountType}</label>
                <input className={`${block}__entry-input`} ref={amountInput} type="number" id="amount" name="amount" defaultValue={0.0} required/>
            </div>
            
            <div className={`${block}__entry-container`}>
                <label className={`${block}__entry-label`} htmlFor="description">Description</label>
                <input className={`${block}__entry-input`} type="text" id="description" name="description" required/>
            </div>
            
            <div className={`${block}__submit-container`}>
                <button  className={`${block}__submit-button`} type = "submit" name = "submit" value = "Submit">
                    <i className='fa fa-exchange'/> Transfer
                </button>
            </div> 

        </form>
    </div>
                
  )
}

export default TransferMoneyForm