import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from 'react-bootstrap/Button'



class Tablexpto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            columnDefs: [
                { title: "Id", field: "id", editable: 'never' },
                { title: "Age", field: "age", type: 'numeric' },
                { title: "Birthday", field: "birthday" },
                { title: "Email", field: "email" },
                { title: "Name", field: "name" },

            ],
            searchedData: [],
            parseData: [],
            searchedData: [],
            showResults: false,
            response: undefined,

        }
    }

    componentDidMount() {
        fetch("/todo?page[number]=1&page[size]=100000")
            .then(response => response.text())
            .then(rowData => {
                const parseData = JSON.parse(rowData);
                this.setState({ parseData });
                console.log(this.state.parseData.data);
                console.log("gta", this.state.parseData.data[0].id);
                this.setState({ id: this.state.parseData.data[0].id })
                console.log("gta5", this.state.id);
            })
            .catch(err => {
                this.setState({ error: err });
                console.log('err' + err);

            });
    }

    renderUpdate() {
        fetch("/todo?page[number]=1&page[size]=100000000")
            .then(response => response.text())
            .then(rowData => {
                const parseData = JSON.parse(rowData);
                this.setState({ parseData });
                console.log('Aqui', this.state.parseData.data);
            })
            .catch(err => {
                this.setState({ error: err });
                console.log('err' + err);

            });
    }
    changeHandler = (e) => {
        console.log('Value', e.target.value);
        this.setState({
            id: e.target.value
        });


    }
    submitHandler = e => {
        e.preventDefault();


        console.log('op', this.state.id);

        console.log('op', this.state.id);
        fetch(`/todo/${this.state.id}`)
            .then(response => response.text())
            .then(rowData => {
                const searchedData = JSON.parse(rowData);
                console.log("TTT", searchedData)
                if (searchedData.code) {
                    alert("Crazy Error: try again");
                    this.setState({ showResults: false });
                    this.setState({ searchedData: undefined });
                    return Promise.reject(rowData.message);
                }

                if (searchedData) {
                    console.log('Aqui', rowData);
                    this.setState({ searchedData });
                    this.setState({ showResults: true });
                    console.log('Aqui888', this.state.searchedData);
                    console.log('boolean', this.state.showResults);
                    return;
                }
            })
            .catch(err => {
                console.log('err' + err);
            });

    }

    render() {
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };


        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
          


        if (this.state.parseData.data) {
            const rows = this.state.parseData.data;
            return (
                <div>
                    <form onSubmit={this.submitHandler}>
                        <label>Search by id:</label><br />
                        {/*<input type="text" name="id" value={this.props.id} onChange={this.changeHandler}></input><br />*/}
                        <select defaultValue={this.state.id} onClick={this.changeHandler}>
                            {rows.map(row => <option key={row.id} value={this.props.id} >{row.id}</option>)}
                        </select>
                        <Button type="submit">Submit</Button>
                    </form>
                    {this.state.showResults ? <div>
                        <label>Age: <p>{this.state.searchedData.age}</p></label><br />
                        <label>Birthday: <p>{this.state.searchedData.birthday}</p></label><br />
                        <label>Email: <p>{this.state.searchedData.email}</p></label><br />
                        <label>Id: <p>{this.state.searchedData.id}</p></label><br />
                        <label>Name: <p>{this.state.searchedData.name}</p></label><br />
                    </div> : null}
                    <div style={{ maxWidth: "100%" }}>
                        <MaterialTable
                            icons={tableIcons}
                            columns={this.state.columnDefs}
                            data={this.state.parseData.data}
                            title="Api Crud"
                            options={{
                                pageSizeOptions: [5, 10, 20, 50, 100, { label: 'All', value: this.state.parseData.total }]
                            }}
                            editable={{
                                onRowAdd: newData => new Promise((resolve) => {
                                    setTimeout(() => {
                                        let errors = false;
                                        let isEmail = emailRegex.test(newData.email);
                                        if (!newData.age) {
                                            errors = true;
                                        }
                                        if (!newData.birthday) {

                                            errors = true;
                                        }
                                        if (!newData.email) {

                                            errors = true;
                                        }
                                        console.log("valid", isEmail);
                                        if (!isEmail) {
                                            alert("Email is not valid");                                            
                                        }

                                        if (!newData.name) {

                                            errors = true;
                                        }

                                        if (errors == false && isEmail) {


                                            var age = parseInt(newData.age);

                                            console.log("Data", newData.birthday);
                                            console.log("Data", age);

                                            var dt = {
                                                "age": age,
                                                "birthday": "" + newData.birthday + "",
                                                "email": "" + newData.email + "",
                                                "name": "" + newData.name + ""
                                            };

                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");

                                            var raw = JSON.stringify(dt);

                                            var requestOptions = {
                                                method: 'POST',
                                                headers: myHeaders,
                                                body: raw,
                                                redirect: 'follow'
                                            };

                                            fetch("/todo", requestOptions)
                                                .then(async response => {
                                                    const data = await response.json();
                                                    let message = (data && data.message) || response.statusText;
                                                    if (!response.ok) {
                                                        return Promise.reject(message);
                                                    }
                                                    let ok = message;
                                                    this.renderUpdate();
                                                    return alert('Row inserted, status: ' + ok);
                                                })
                                                .catch(error => {
                                                    alert('There was an error: ' + error + ' Try again');
                                                });
                                                resolve();
                                        }
                                        if(errors == true){
                                            alert("Al fields required, row was not inserted")
                                        }
                                       
                                        resolve(); 
                                    }, 600);
                                }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            let isEmail = emailRegex.test(newData.email);
                                            if(isEmail){
                                                var age = parseInt(newData.age);
                                                var dt = {
                                                    "age": age,
                                                    "birthday": "" + newData.birthday + "",
                                                    "email": "" + newData.email + "",
                                                    "name": "" + newData.name + ""
                                                };
    
                                                var raw = JSON.stringify(dt);
    
                                                var myHeaders = new Headers();
                                                myHeaders.append("Content-Type", "application/json");
    
                                                var requestOptions = {
                                                    method: 'PATCH',
                                                    headers: myHeaders,
                                                    body: raw,
                                                    redirect: 'follow'
                                                };
    
                                                fetch(`/todo/${oldData.id}`, requestOptions)
                                                    .then(response => {
                                                        console.log(response.text());
                                                        var ok = response;
                                                        console.log(ok.status);
                                                        if (ok.status === 200) {
                                                            this.renderUpdate();
                                                            alert("Row Updated");
                                                        } else if (ok.status === 500) {
                                                            alert("Row was not updated due to porposefull errro: try again");
                                                        }
                                                    })
                                                    .then(result => console.log(result))
                                                    .catch(error => console.log('error', error));
    
    
                                                resolve();
                                            }
                                            if(!isEmail){
                                                alert("Email needs to be valid");
                                            }                                           
                                            resolve();
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                console.log('Data ', oldData.id);
                                                var requestOptions = {
                                                    method: 'DELETE',
                                                    redirect: 'follow'
                                                };
                                                fetch(`/todo/${oldData.id}`, requestOptions)
                                                    .then(response => {
                                                        console.log(response.text());
                                                        var ok = response;
                                                        console.log(ok.status);
                                                        if (ok.status === 204) {
                                                            let parseData = this.state.parseData.data;
                                                            this.setState({ parseData }, () => resolve());
                                                            this.renderUpdate();
                                                            alert("Row deleted");
                                                        } else if (ok.status === 500) {
                                                            alert("Row was not deleted due to porposefull errro: try again");
                                                        }
                                                    })
                                                    .then(result => console.log(result))
                                                    .catch(error => console.log('error', error));


                                                /* let data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data.splice(index, 1);
                                                this.setState({ data }, () => resolve()); */
                                            }
                                            resolve();
                                        }, 1000);
                                    })
                            }}
                        />
                    </div>
                </div>
            );
        }
        return (
            <p>Random Error, plese refresh the page</p>
        );
    }
}

export default Tablexpto;






