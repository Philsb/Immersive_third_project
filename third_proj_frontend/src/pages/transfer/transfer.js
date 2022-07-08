import { useEffect, useRef, useState } from "react";
import Form from "../../components/Form/Form";
import FormInput from "../../components/Form/FormInput";
import Modal from "../../components/Modal/Modal";
import Divider from "../../components/Divider/Divider";
import Loading from  "../../components/Loading/Loading";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";
import TransferMoneyForm from "../../components/Form/TransferMoneyForm";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";


function Transfer () {
    const navigate = useNavigate();
    const block = "transfer-page";
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
            if (res.status == 200) {
                navigate("/dashboard");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Made transaction',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
            if (res.status != 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error in transaction',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
 
            return res.json();
        }).then((res)=>{
            
        });
    }
    
    return (
        
        <section>
            <h1>Transfer money</h1>
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
                        isReceivingMoney = {false}
                    />
                        
                    :
                    <Loading/>
                }
        
                    

            
            
        </section>
    );
}

export default Transfer;