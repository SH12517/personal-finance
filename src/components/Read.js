import axios from 'axios';
import { RiDeleteBin5Fill, RiEdit2Fill } from 'react-icons/ri';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, differenceInHours, differenceInDays, differenceInMinutes } from 'date-fns';

function Read() {
  const [apidata, setApiData] = useState([]);

  function getData() {
    axios.get('https://64f36ec6edfa0459f6c69656.mockapi.io/PeerXp').then((response) => {
      setApiData(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`https://64f36ec6edfa0459f6c69656.mockapi.io/PeerXp/${id}`)
        .then(() => {
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function setDataToStorage(id, name, category, amount, date, currentTime) {
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('category', category);
    localStorage.setItem('amount', amount);
    localStorage.setItem('date', date);
    localStorage.setItem('currentTime', currentTime);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex gap-4 justify-content-end">
        <h4>My Expense Manager</h4>
        <div>
          <input type="search" placeholder="Filter By Date of Expense" className="form-control" />
        </div>
        <div>
          <input type="search" placeholder="Search Expense by Name" className="form-control" />
        </div>
        <div>
          <Link to="/create">
            <button className="btn btn-info">+ New Expense</button>
          </Link>
        </div>
      </div>

      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date of Expense</th>
            <th>Amount</th>
            <th>Updated At</th>
            <th>Created by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {apidata && apidata.map((item) => {
            const updateDate = new Date(item.Update);
            const currentDate = new Date();
            const hoursDiff = differenceInHours(currentDate, updateDate);
            const minDiff = differenceInMinutes(currentDate, updateDate);
            const daysDiff = differenceInDays(currentDate, updateDate);

            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.Category}</td>
                <td>{format(new Date(item.date), 'yyyy-MM-dd')}</td>
                <td><b>INR</b>{item.Amount}</td>
                <td>
                  {hoursDiff >= 24
                    ? `${daysDiff} days ago`
                    : `${hoursDiff} hours ${minDiff} min`}
                </td>
                <td>{item.Created === 'me' ? 'me' : item.Created}</td>
                <td>
                  <Link to="/edit">
                    <button className="btn btn-primary" onClick={() => setDataToStorage(item.id, item.name, item.Category, item.date, item.Amount, item.Update)}>
                      <RiEdit2Fill />
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                    <RiDeleteBin5Fill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Read;
