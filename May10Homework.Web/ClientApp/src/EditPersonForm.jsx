import React from 'react';

export default function PersonForm({onUpdateClick, onCancelClick, onTextChange, firstName, lastname, age}){
    return <>
    
    <div className="row p-5 rounded">
        <div className="col-md-3">
            <input type="text" value={firstName} name='firstName' className="form-control" placeholder="First Name" onInput={onTextChange}/>
        </div>
        <div className="col-md-3">
            <input type="text" value={lastname} name='lastName' className="form-control" placeholder="Last Name" onInput={onTextChange}/>
        </div>
        <div className="col-md-3">
            <input type="text" value={age} name='age' className="form-control" placeholder="Age" onInput={onTextChange}/>
        </div>
        <div className="col-md-3">
            <button className='btn btn-warning w-100' onClick={onUpdateClick}>Update</button>
        </div>
    </div>
    <div className='row'>
    <div className="col-md-3">
            <button className='btn btn-dark w-100' onClick={onCancelClick}>Cancel</button>
        </div>
    </div>
    </>
}