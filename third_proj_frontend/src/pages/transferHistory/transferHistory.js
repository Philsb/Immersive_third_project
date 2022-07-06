import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";

const AccountHistory = () => {

    const token = sessionStorage.getItem("Auth") || "";
    const [loadedHistory, setLoadedHistory] = useFetch(`${process.env.REACT_APP_API_BASE_PATH}transaction/` 
                                                    ,"GET",
                                                    {
                                                        Authorization: "Bearer "+ token
                                                    });
    
    console.log(loadedHistory);
    return (
        <section>   
            {loadedHistory != null ?
                <List>
                    {loadedHistory.map((entry)=>{
                        return <div>
                            {entry.origin_account_number}
                            <hr/>
                            {entry.destination_account_number}
                            <hr/>
                            {entry.amount}
                            <hr/> 
                            {entry.transaction_date}
                            <hr/>
                            {entry.transaction_desc}
                        </div>;
                    })}
                </List>
                :
                <>Cargando</>
            
            }
            
        </section>
    );
    
    
}

export default AccountHistory;