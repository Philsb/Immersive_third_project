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
                    {iconClass: "fa-exchange", to: "/"},
                    {iconClass: "fa-history", to: "/"},
                    {iconClass: "fa-money", to: "/"}

                ]}>
                
                <Outlet/>  
            </SidebarLayout>
        </div>
        
    )
    ;
}

export default DashboardPage;