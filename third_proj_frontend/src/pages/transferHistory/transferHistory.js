import AccountHistoryEntry from "../../components/AccountHistoryEntry/AccountHistoryEntry";
import Divider from "../../components/Divider/Divider";
import List from "../../components/List/List";
import SearchBar from "../../components/searchbar/Searchbar";
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
            <h1>Transfer history</h1>
            <Divider/>
            <SearchBar/>
            {loadedHistory != null ?
                <List>

                    {loadedHistory.map((entry)=>{
                        return( 
                        <AccountHistoryEntry
                            originAccount = {entry.origin_account_number}
                            destinationAccount = {entry.destination_account_number}
                            amount = {`${(entry.amount.split("₡"))[1]} ${entry.type_abbreviation}` }
                            date = {new Date(entry.transaction_date).toLocaleDateString("en-US")}
                            description = {entry.transaction_desc}
                            
                        />);
                    })}
                </List>
                :
                <>Cargando</>
            
            }
            
        </section>
    );
    
    
}

export default AccountHistory;