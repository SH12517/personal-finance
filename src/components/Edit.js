
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './create.css'
//This Edit Component For Editing the Data on licked ID/Data
function Edit() {
  const [id, setId] = useState(''); // Get the expense ID from the URL
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate()

useEffect(() => {
    setId(localStorage.getItem('id'));
    setName(localStorage.getItem('name'));
    setCategory(localStorage.getItem('category'));
    setDate(localStorage.getItem('date'));
    setAmount(localStorage.getItem('amount'));

  
  }, [])

const handleformSubmit= (e)=>{
    e.preventDefault();
    axios.put(`https://64f36ec6edfa0459f6c69656.mockapi.io/PeerXp/${id}`,{
      name:name,
      Category:category,
      Amount :amount,
      date:date,
      Update : currentTime,
    }).then(()=>{
      navigate('/read')
    }).catch((err)=>{
      console.log(err)
  })
  
   }

  return (
    <div className=" create-form col-md-5  rounded container mt-3 p-5 border border-dark">
      <h3 className="d-flex justify-content-start text-black " >Edit Expense</h3>
      <Link to={`/read/${id}`}>Back to Expense Details</Link>
      <form className="form-group mt-3 " onSubmit={handleformSubmit} >
      <div className=" mb-2">
      
        <label>Name:</label>
        <input
          type="text"
          name='name'
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
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
      <div>
        <label>Date of Expense:</label>
        <input
          type="date"
          name='date'
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name='Amount'
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
  );
}

export default Edit;
