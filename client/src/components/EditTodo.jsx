import React, { useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import Error from './Error';

const EditTodo = (props) => {
  const [editValue, setEditValue] = useState('');
  const [showError, setShowError] = useState(false);

  const handleEdit = (e, id) => {
    e.preventDefault();
    if (editValue !== '') {
      if (showError) {
        setShowError(false);
      }
      const todo = {
        title: editValue,
      };

      // axios put request to update todo
      axios
        .put(`/update/todo/${id}`, todo)
        .then(() => console.log('Todo updated'))
        .catch((err) => console.error(err));
    } else {
      setShowError(true);
      console.error('Error');
    }
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
    console.log();
  };

  return (
    <div className='container mt-5' location={props.location}>
      {showError ? <Error /> : null}
      <form
        className=' d-flex flex-row mb-3'
        onSubmit={(e) => handleEdit(e, props.location.state)}
      >
        <input
          type='text'
          className='form-control me-3'
          placeholder='Todo'
          onChange={handleEditChange}
        />
        <input type='submit' value='Save' className='btn btn-primary' />
        <Link to='/'>
          <button className='btn btn-secondary ms-3'>Home</button>
        </Link>
      </form>
    </div>
  );
};

export default EditTodo;
