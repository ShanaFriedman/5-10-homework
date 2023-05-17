import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import EditPersonForm from './EditPersonForm';
import axios from 'axios';

class PeopleTable extends React.Component {
    state = {
        People: [],
        selectedPeople: [],
        Person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        EditPerson: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        Editing: false
    }

    componentDidMount = () => {
        this.refreshTable();
    }

    refreshTable = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ People: res.data })
        })
    }

    onTextChange = e => {
        const copy = { ...this.state.Person }
        copy[e.target.name] = e.target.value
        this.setState({ Person: copy })
    }

    onEditTextChange = e => {
        const copy = { ...this.state.EditPerson }
        copy[e.target.name] = e.target.value
        this.setState({ EditPerson: copy })
    }

    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.Person).then(() => {
            this.refreshTable()
            this.setState({
                Person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            })
        })
    }

    onUpdateClick = () => {
        axios.post('/api/people/edit', this.state.EditPerson).then(() => {
            this.refreshTable()
            this.setState({
                Editing: false, EditPerson: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''

                }
            })
        })

    }

    onDeleteClick = (id) => {
        axios.post('/api/people/delete', id).then(() => {
            this.refreshTable()
        })
    }

    onEditClick = (p) => {
        this.setState({ Editing: true, EditPerson: p })
    }

    onCancelClick = () => {
        this.setState({
            Editing: false, EditPerson: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }

    onCheckBoxChange = (id) => {
        const { selectedPeople } = this.state

        if (selectedPeople.includes(id)) {
            this.setState({ selectedPeople: selectedPeople.filter(p => p !== id) })
        } else {
            this.setState({ selectedPeople: [...selectedPeople, id] })
        }
    }

    onDeleteAllClick = () => {
        axios.post('/api/people/deletemany', { ids: this.state.selectedPeople }).then(() => {
            this.refreshTable()
        })
    }
    // onCheckAllClick = () => {
    //     this.setState({ selectedPeople: this.state.People.map(p => p.id) })
    // }

    // OnUncheckAll = () => {
    //     this.setState({ selectedPeople: [] })
    // }

    render() {
        const { People, Editing, selectedPeople } = this.state;

        return (<>

            <div className='container mt-5'>
                {Editing && <EditPersonForm
                    onTextChange={this.onEditTextChange}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                    firstName={this.state.EditPerson.firstName}
                    lastname={this.state.EditPerson.lastName}
                    age={this.state.EditPerson.age} />}

                {!Editing && <PersonForm
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    firstName={this.state.Person.firstName}
                    lastname={this.state.Person.lastName}
                    age={this.state.Person.age} />}

                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>
                                <div className='mt-1'>
                                    <button className='btn btn-danger btn-block' onClick={this.onDeleteAllClick}>Delete All</button>
                                </div>
                                <div className='mt-1'>
                                    <button className='btn btn-outline-danger btn-block' onClick={() => {this.setState({ selectedPeople: this.state.People.map(p => p.id) })}}>Check All</button>
                                </div>
                                <div className='mt-1'>
                                    <button className='btn btn-outline-danger btn-block' onClick={() => {this.setState({ selectedPeople: [] })}}>Uncheck All</button>
                                </div>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Delete/Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {People.map(p => <PersonRow
                            firstName={p.firstName}
                            lastName={p.lastName}
                            age={p.age}
                            key={p.id}
                            onEditClick={() => this.onEditClick(p)}
                            onDeleteClick={() => this.onDeleteClick(p)}
                            onCheckBoxChange={() => this.onCheckBoxChange(p.id)}
                            isChecked={selectedPeople.includes(p.id)}
                        />)}
                    </tbody>
                </table>

            </div>
        </>);
    }
}
export default PeopleTable;