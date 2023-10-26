import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './create.css'
function Create({user}) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate()
 const handleformSubmit= (e)=>{
            e.preventDefault();
            axios.post('https://64f36ec6edfa0459f6c69656.mockapi.io/PeerXp',{
              name:name,
              Category:category,
              Amount :amount,
              date:date,
              Update : currentTime,
              Created:user,
            }).then(()=>{
              navigate('/read')
            }).catch((err)=>{
              console.log(err)
          })
          
           }
    return (
        <div className=" create-form col-md-5 rounded container mt-2 p-4 border border-dark">
        <h4 className="d-flex justify-content-start text-black ">Create New Expense</h4>
        <div className=" mb-2">
          <form className="form-group " onSubmit={handleformSubmit}>
            <div className="mb-3">
              <label>Name </label>
              <input
                type="text" maxLength={140}
                placeholder="Name the Expense"
                name="name"
                className="form-control mt-3"
                required
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="mb-3 ">
            <label> Describe Expense </label>
              <input type='text' placeholder='Describe the Expense'  
              className='form-control mt-3'
              value={description} 
              onChange={(e)=>setDescription(e.target.value)} />
        
            </div>
            <div className="mb-3">
              <label>Category</label>
<select name='category' className='form-control form-select mt-3'
 value={category} 
onChange={(e) => setCategory(e.target.value)}>
                <option>Select Category</option>
                <option value="Book">Book</option>
                <option value="Health">Health</option>
                <option value="Electronics">Electronics</option>
                <option value='Travel'>Travel</option>
                <option value ='Education'>Education</option>
                <option value='Others'>Others</option>

              </select>
            </div>
            <div className="mb-3">
              <label>Date of Expense:</label>
              <input
                type="date"
                value={date} onChange={(e) => setDate(e.target.value)} 
                name="date"
                placeholder='Date of Expense'
                className="form-control mt-4"
                required
              />
            </div>
            <div className="mb-3">
              <label>Expense Amount</label>
              <input
                type="number"
                placeholder="Expense Amount in INR"
                name="Amount"
                min={0}
                className="form-control mt-4"
                value={amount}
                required
                onChange={(e)=>setAmount(e.target.value)}
              />
            </div>
         
            <input type='date' value={currentTime} name='currentTime' 
            onChange={(e)=>setCurrentTime(e.target.value)} hidden />
          
            <div className='d-flex justify-content-between'>
            <div>
              <input
                className="btn btn-secondary mt-4 "
                type="reset"
                value="Cancel"
              />
            </div>

         <div>
              <input
                className="btn btn-primary mt-4 "
                type="submit"
                value="Create Expense"
                
              /> 
            </div>
            </div>
          </form>
         
        </div>
      </div>
  )
}

export default Create