import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTable from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationOptions from './TablePaginationOptions.js';
import TablePaginationActions from './TablePaginationOptions.js';
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import IconButton from '@material-ui/core/IconButton';
import CustomTableCell from './CustomTableCell.js'
import { Input } from '@material-ui/core';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parseData: [],
      row: [],
      err: {},
      page: 0,
      editIdx: -1,
      rowsPerPage: 10,
      isEditMode: false,
      useStyles2: makeStyles({
        table: {
          minWidth: 500,
        },
        tableCell: {
          width: 130,
          height: 40
        },
        input: {
          width: 130,
          height: 40
        },
        selectTableCell: {
          width: 60
        },
      }),
    };
  }


  componentDidMount() {
    fetch("/todo?page[number]=1&page[size]=100000000")
      .then(response => response.text())
      .then(rowData => {
        const parseData = JSON.parse(rowData);
        this.setState({ parseData })
        console.log('Aqui', this.state.parseData.data);
        this.createData();
      })
      .catch(err => {
        this.setState({ error: err });
        console.log('err' + err);

      });
  }

  renderOnDelete() {
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

  startEditing = (id) => {

  }

  handleRemove = (id) => {
    console.log('handleRemove: ', id);
    if (id) {
      var raw = "";

      var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
      };
      fetch(`/todo/${id}`, requestOptions)
        .then(response => {
          console.log(response.text());
          var ok = response;
          console.log(ok.status);
          if (ok.status == 204) {
            alert("Row deleted");
            //update render
            this.renderOnDelete();
          } else if (ok.status == 500) {
            alert("Row was not deleted due to porposefull errro: try again");
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }



  render() {
    const { parseData, row, previous, editIdx } = this.state;
    const rows = parseData.data;
    console.log("row", row);
    const length = parseData.total;
    const classes = this.state.useStyles2;

    const handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };
    const handleChangeRowsPerPage = (event) => {
      console.log(event.target.value);
      this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
      //this.setState({page: 0});
    };

    const startEditing = i => {
      this.setState({ editIdx: i })
    }

    const stopEditing = () => {
      this.setState({ editIdx: -1 });
    };
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, length - this.state.page * this.state.rowsPerPage);
    if (rows) {
      return (
        <div>
          <Table style={classes.table}>
            <TableHead>
              <TableRow style={{ minWidth: 200 }}>
                <TableCell align="left">ID</TableCell>
                <TableCell align="right" >Age</TableCell>
                <TableCell align="right">Birthday</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.state.rowsPerPage > 0
                ? rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                : rows
              ).map((row) => (

                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.age}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.birthday}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <EditIcon onClick={() => this.startEditing(row.id)} />
                    <DeleteIcon onClick={() => this.handleRemove(row.id)} />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )},
              </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={this.state.parseData.total}
            page={this.state.page}
            onChangePage={handleChangePage}
            rowsPerPage={this.state.rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      )
    }
    return (
      <div>
        <p>No Data in the API: refresh page a few times</p>
      </div>
    )
  }
}

export default Grid;
