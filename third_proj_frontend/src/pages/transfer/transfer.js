import { useEffect, useRef, useState } from "react";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";

function Transfer () {
    
    const token = sessionStorage.getItem("Auth") || "";
    const selectElement = useRef(null);
    const amountInput = useRef(null);
    const [selectedAccountType,setSelectedAccountType] = useState(null);
    const [loadedAccounts,setLoadedAccounts] = useFetch(`${process.env.REACT_APP_API_BASE_PATH}account/` 
                                                    ,"GET",
                                                    {
                                                        Authorization: "Bearer "+ token
    
                                                    });
    console.log();
    useEffect(()=>{
        if (loadedAccounts != null && loadedAccounts.length > 0) {
            setSelectedAccountType(loadedAccounts[0].type_name);
        }

    }, [loadedAccounts]);
    const handleSelectChange = ()=>{
        console.log("Loaded accounts", loadedAccounts);
        let foundAccount = loadedAccounts.find(element => element.account_number == selectElement.current.value);
        //console.log(foundAccount);
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
                    "originAccount": generateIBAN(data.get("originAccount")) ,
                    "destAccount": data.get("destination"),
                    "amount": data.get("amount"),
                    "description":  data.get("description")
                }
            })
        }

        console.log(fetchConfig);
        fetch(`${process.env.REACT_APP_API_BASE_PATH }transaction/`, fetchConfig)
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
                    <label htmlFor="originAccount">Select Account:</label>
                    <select onChange={handleSelectChange} ref={selectElement} name="originAccount" id="originAccount">

                        {loadedAccounts.map((account)=>{
                            return <option value={account.account_number}>{generateIBAN(account.account_number)}</option>
                        })}
                    </select>
                    
                    <label htmlFor="destination">Destination Account:</label>
                    <input type="text" id="destination" name="destination" required/>

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

export default Transfer;