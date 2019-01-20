import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import CustomerForm from './components/CustomerForm';
import CustomersTable from './components/CustomersTable';

import apiRequest from './api/apiRequest';
import { DateFormatInput } from 'material-ui-next-pickers';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            created: {
                lte: null,
                gte: null,
            },
            customers: [],
        };
    }

    setDate = date => {
        date = date instanceof Date ? date : date.toDate();

        const gte = moment(date).unix();
        const lte = moment(date)
            .add(1, 'day')
            .unix();
        const created = {
            gte,
            lte,
        };
        this.setState({
            date: date,
            created
        });
        this.getCustomers(created);
    };

    getCustomers = (created) => {
        if(!created) created = this.state.created
        let stripe_param = {
            limit: 100,
            created: created,
        };

        stripe_param = JSON.stringify(stripe_param);

        return apiRequest({
            method: 'get',
            url: '/api/customers',
            params: {
                stripe_param: stripe_param,
            },
        })
            .then(customers => {
                this.setState({
                    customers,
                });
                return customers;
            })
            .catch(e => {
                console.log(e.message);
            });
    };

    UNSAFE_componentWillMount() {
        const now = moment();
        this.setDate(now.startOf('day'));
    }

    componentDidMount() {

        this.getCustomers();
         this.updateInterval = setInterval(async () => {
             console.log('interval');
             this.getCustomers();
         }, 30000);
    }


    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        let { date, customers } = this.state;
        return (
            <Grid container className="customersForm" justify="center">
                <Grid item xs={12} sm={8} md={5}>
                    <CustomerForm getCustomers={this.getCustomers} />
                </Grid>

                <Grid item xs={12} />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    style={{ padding: '40px 0 10px' }}
                >
                    <DateFormatInput
                        name="date"
                        value={date}
                        onChange={this.setDate}
                    />
                </Grid>

                <Grid item xs={12} />
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    style={{ padding: '0px 0 20px' }}
                >
                    <CustomersTable customers={customers} />
                </Grid>
            </Grid>
        );
    }
}

export default App;
