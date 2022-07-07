import AccountCard from "../../components/card/AccountCard";
import CardWrapper from "../../components/card/CardWrapper";
import FlexContainer from "../../components/Container/FlexContainer";
import Divider from "../../components/Divider/Divider";
import List from "../../components/List/List";
import Loading from "../../components/Loading/Loading";
import generateIBAN from "../../helpers/generateIban";
import useFetch from "../../hooks/useFetch";

const DashboardDetails = () => {
    const token = sessionStorage.getItem("Auth") || "";
    const [loadedAccounts,setLoadedAccounts] = useFetch(`${process.env.REACT_APP_API_BASE_PATH}account/` 
                                                    ,"GET",
                                                    {
                                                        Authorization: "Bearer "+ token
                                                    });
    


    return( 
    
    <section>
        <h1>Accounts</h1>
        <Divider/>  
        {
            loadedAccounts ? 
            <FlexContainer>
                {loadedAccounts.map(account => {
                    return (
                        <AccountCard
                            accountNumber = {generateIBAN(account.account_number)}
                            balance = {`${account.balance.split("₡")[1]} ${account.type_abbreviation}`}
                            currencyType = {account.type_name}
                        />
                    );
                })}
            </FlexContainer>
            
            : 
            <Loading/>

        }

    </section>);
}

export default DashboardDetails;