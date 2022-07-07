import { useEffect, useRef, useState } from "react";
import Divider from "../../components/Divider/Divider";
import Form from "../../components/Form/Form";
import TransferMoneyForm from "../../components/Form/TransferMoneyForm";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";

const AddMoney = ()  => {
    const block = "add-money-page";
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
            <h1>Add money</h1>
            <Divider/>
            {
                loadedAccounts && selectedAccountType ?
                <TransferMoneyForm
                    handleTransfer = {handleTransfer}
                    handleSelectChange = {handleSelectChange}
                    selectElementRef = {selectElement}
                    amountInput = {amountInput}
                    loadedAccounts = {loadedAccounts}
                    selectedAccountType = {selectedAccountType}
                    isReceivingMoney = {true}
                />

                :
                <Loading/>
            }
        
                    

            
            
        </section>
    );
}

export default AddMoney;