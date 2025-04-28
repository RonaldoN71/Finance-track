import React from 'react'
import{useUser} from "@clerk/clerk-react";
import Financial_rcf from "./Financial_rcf";
import Financial_rcl from "./Financial_rcl";
import {useFinancialRecords} from './contextProvider/Context';
import "./financial.css";
import {useMemo} from 'react';
const Dashboard = () => {
    const {records} = useFinancialRecords();
    const {user} = useUser();

    const totalMonthly = useMemo(()=>{
        let totalAmount = 0;
        records.forEach((record)=>{
            totalAmount += record.amount;
        });
        return totalAmount;
    },[records]);
    console.log("Monthly:",totalMonthly);
  return (
    <div className="dashboard-container">
    <h1>Welcome {user?.firstName}</h1> <br/>
    <h2>Track your expense</h2>
    <Financial_rcf/>
    <div>Total Monthly: {totalMonthly}</div>
    <Financial_rcl/>
    </div>
  )
}

export default Dashboard
