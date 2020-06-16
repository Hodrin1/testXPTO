import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

export default function CustomTableCell({ row, name, onChange, editIdx }) {
    const classes = useStyles()
    const currentlyEditing = editIdx === row.id;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {currentlyEditing ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                    row[name]
                )}
        </TableCell>
    );
}
