import React from 'react';

export default function ({ firstName, lastName, age, onEditClick, onDeleteClick, onCheckBoxChange, isChecked }) {
    return (<tr>
        <td>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={isChecked} onChange={onCheckBoxChange} />
        </div>
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <div className='col-md-2'>
                <button className='btn btn-warning' onClick={onEditClick}>Edit</button>
            </div>
            <div className='col-md-2'>
                <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
            </div>

        </td>
    </tr>)

}