import { useEffect, useRef, useState } from "react";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";

const AddMoney = ()  => {
    const token = sessionStorage.getItem("Auth") || "";
    const selectElement = useRef(null);
    const amountInput = useRef(null);
    const [selectedAccountType,setSelectedAccountType] = useState(null);
    const [loadedAccounts,setLoadedAccounts] = useFetch(`${process.env.REACT_APP_API_BASE_PATH}account/` 
                                                    ,"GET",
                                                    {
                                                        Authorization: "Bearer "+ token
    
                                                    });

    useEffect(()=>{
        if (loadedAccounts != null && loadedAccounts.length > 0) {
            setSelectedAccountType(loadedAccounts[0].type_name);
        }

    }, [loadedAccounts]);
    const handleSelectChange = ()=>{
        let foundAccount = loadedAccounts.find(account => account.account_number == selectElement.current.value);
        setSelectedAccountType(foundAccount.type_name);
        amountInput.current.value = 0.0;
    }

    const handleTransfer = (e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem("Auth")
        };

        const fetchConfig = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "transaction": {
                    "originAccount": data.get("originAccount") ,
                    "destAccount": generateIBAN(data.get("destination")),
                    "amount": data.get("amount"),
                    "description":  data.get("description")
                }
            })
        }

        console.log(fetchConfig);
        fetch(`${process.env.REACT_APP_API_BASE_PATH }transaction/fromexternal`, fetchConfig)
        .then((res) => {
            
            return res.json();
        }).then((res)=>{
            console.log(res);
        });
    }
    
    return (
        
        <section>
            {
                loadedAccounts && selectedAccountType ?
                 
                <Form onSubmit = {handleTransfer}>
                    
                    
                    <label htmlFor="originAccount">External Account:</label>
                    <input type="text" id="originAccount" name="originAccount" required/>

                    <label htmlFor="destination">Destination Account:</label>
                    <select onChange={handleSelectChange} ref={selectElement} name="destination" id="destination">

                        {loadedAccounts.map((account)=>{
                            return <option value={account.account_number}>{generateIBAN(account.account_number)}</option>
                        })}
                    </select>

                    <label htmlFor="amount">Amount in {selectedAccountType}</label>
                    <input ref={amountInput} type="number" id="amount" name="amount" defaultValue={0.0} required/>

                    <label htmlFor="description">Description</label>
                    <input ref={amountInput} type="text" id="description" name="description" required/>
                    


                </Form>
                :
                <></>
            }
        
                    

            
            
        </section>
    );
}

export default AddMoney;