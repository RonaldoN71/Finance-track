import React from 'react'
import {useState} from 'react';
import{useFinancialRecords} from './contextProvider/Context';
import { useUser } from "@clerk/clerk-react";
import {formatDate} from '../../utils/dates';

function Financial_rcf() {
    const {user} = useUser();
    const {addRecord} = useFinancialRecords();
    const [formData,setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        customCategory: '',
        paymentMethod: ''
    });
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]: value
        }))
    }
  const finalCategory =
  formData.category === "other" ? formData.customCategory : formData.category;

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const currentDate = formatDate(new Date());
        const preparedData = {
            ...formData,
            category: finalCategory,
            amount: parseInt(formData.amount),
            date: currentDate,
            userId: user?.id?? ""
        };
    console.log("Submitted: ",preparedData);
    await addRecord(preparedData);
    setFormData({
        description: '',
        amount: '',
        category: '',
        paymentMethod: ''
      });
    }

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Description:</label>
                <input type="text" required 
                name="description"
               value ={formData.description}
               onChange={handleChange}
                className="input"/>
            </div>
            <div className="form-field">
                <label>Amount(use - for expense out):</label>
                <input type="number" required 
                name ="amount"
                value ={formData.amount}
                onChange={handleChange}
                className="input"/>
            </div>
            <div className="form-field">
                <label>Category:</label>
               {formData.category === "other" ? (
    <input
      type="text"
      placeholder="Enter custom category"
      value={formData.customCategory}
      name="customCategory"
      onChange={handleChange}
      className="input"
    />
  ) : (
    <select
      required
      value={formData.category}
      name="category"
      onChange={handleChange}
      className="input"
    >
      <option value="">Select category</option>
      <option value="food">Food</option>
      <option value="cloth">Cloth</option>
      <option value="bills">Bills</option>
      <option value="maintenance">Maintenance</option>
      <option value="other">Other</option>
    </select>
  )}
            </div>
            <div className="form-field">
                <label>Payment:</label>
                <select required 
                onChange={handleChange}
                name="paymentMethod"
                value ={formData.paymentMethod}
                className="input">
                <option value="">Select Payment method</option>
                <option value="credit-card">Credit card</option>
                <option value="debit-card">Debit card</option>
                </select>
            </div>
            <button style={{
  backgroundColor: "navy",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
}} type="submit">Add record</button>
        </form>
      
    </div>
  )
}

export default Financial_rcf
