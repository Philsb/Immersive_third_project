import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import App from './App';

import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import './index.scss';

import Home from "./pages/home/home";
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import DashboardPage from './pages/dashboardPage/dashboardPage';
import AddMoney from './pages/addmoney/addmoney';
import Transfer from './pages/transfer/transfer';
import Profile from './pages/profile/profile';
import DashboardDetails from './pages/dashboardDetails/dashboardDetails';
import Services from './pages/services/services';
import AccountHistory from './pages/transferHistory/transferHistory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        
        <Routes>
          <Route path = "/" element ={<App/>}>
            <Route index path="/" element= {<Home/>}/>
            <Route path="dashboard" element = {<DashboardPage/>}>
            <Route path="dashboard"/>
              <Route path="addmoney" element= {<AddMoney/>}/>
              <Route path="transfer" element= {<Transfer/>}/>
              <Route path="profile" element= {<Profile/>}/>
              <Route path="services" element= {<Services/>}/>
              <Route path="history" element= {<AccountHistory/>}/>
              <Route path="" element= {<DashboardDetails/>}/> 
            </Route>
            
            <Route path="signup" element= {<Signup/>}/>

            <Route path="login" element= {<Login/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

