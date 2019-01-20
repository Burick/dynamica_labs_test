import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import moment from 'moment';


class CustomersTable extends Component {


    render() {
        let { customers } = this.props;

        return (
            <Card className="">
                <CardContent>
                    <Table className="">
                        <TableHead style={{ background: 'black' }}>
                            <TableRow>
                                <TableCell style={{ color: 'white' }}>
                                    Customer Email
                                </TableCell>
                                <TableCell
                                    style={{ color: 'white' }}
                                    align="right"
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    style={{ color: 'white' }}
                                    align="right"
                                >
                                    Balance
                                </TableCell>
                                <TableCell
                                    style={{ color: 'white' }}
                                    align="right"
                                >
                                    Created
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map(customer => (
                                <TableRow className="" key={customer.id}>
                                    <TableCell align="right">
                                        {customer.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.description}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.account_balance}
                                    </TableCell>
                                    <TableCell align="right">
                                        {moment
                                            .unix(customer.created)
                                            .format('MM-DD-YYYY')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

export default CustomersTable;
