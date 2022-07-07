import { Outlet } from 'react-router-dom';
import Divider from '../../components/Divider/Divider';
import SidebarLayout from '../../components/Sidebar/SidebarLayout';
const DashboardPage = () => {
    const block = "dashboard-page";
    return (
        <div className={`${block}`}>
            <SidebarLayout
                profileLink = {{iconClass: "fa-user", to: "profile"}}
                links = {[
                    {iconClass: "fa-exchange", to: "transfer"},
                    {iconClass: "fa-history", to: "history"},
                    {iconClass: "fa-money", to: "addmoney"}

                ]}>
                
                <Outlet/>  
            </SidebarLayout>
        </div>
        
    )
    ;
}

export default DashboardPage;