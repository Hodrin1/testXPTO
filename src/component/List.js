import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Hidden } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            searchedData: [],
            parseData: [],
            showResults: false,
            useStyles1: makeStyles({
                hidden: {
                    display: "block",
                }
            }),
            response: undefined
        }



    }

    componentDidMount() {
        fetch("/todo?page[number]=1&page[size]=100000")
            .then(response => response.text())
            .then(rowData => {
                const parseData = JSON.parse(rowData);
                this.setState({ parseData });
                console.log('oj', this.state.parseData.data);
            })
            .catch(err => {
                this.setState({ error: err });
                console.log('err' + err);

            });
    }

    changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.valueAsNumber || e.target.value
        });
    }
    submitHandler = e => {
        e.preventDefault();


        console.log('op', this.state.id);
        fetch(`/todo/${this.state.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
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


        // fetch(`/todo/${this.state.id}`)
        // .then(response => {
        //     console.log(response.text());
        //     var data = response.text();
        //     var ok = response;
        //     console.log(ok.status);

        //     console.log(data);
        //     if (ok.status === 200) {

        //         alert("Row Found");
        //     } else if (ok.status === 500) {
        //         alert("Row was not deleted due to porposefull errro: try again");
        //     }
        // })
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));

    }



    render() {
        //console.log('data887', this.state.searchedData);
        const data = this.state.searchedData;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>Search by id:</label><br />
                    {/*<input type="text" name="id" value={this.props.id} onChange={this.changeHandler}></input><br />*/}
                    <select >
                        {data.map(row => <option key={row.id} value={row.id}>{row.name}</option>)}
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
            </div>

        );

        // if (this.state.parseData.data) {
        //     if (this.state.searchedData){
        //             const data = this.state.searchedData;
        //             return (
        //                 <div>
        //                     <label>Age: <p>{data.age}</p></label>
        //                     <label>Birthday: <p>{data.birthday}</p></label>
        //                     <label>Email: <p>{data.email}</p></label>
        //                     <label>Id: <p>{data.id}</p></label>
        //                     <label>Name: <p>{data.name}</p></label>
        //                 </div>
        //             )
        //         }
    }
}

export default List;












