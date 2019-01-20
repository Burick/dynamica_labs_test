import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import apiRequest from '../api/apiRequest';

class CustomerForm extends Component {
    state = {
        info: {
            status: true,
            message: '',
        },
        customerForm: {
            email: '',
            description: '',
            account_balance: '',
        },
    };

    handleChange = e => {
        const { customerForm } = this.state;
        customerForm[e.target.name] = e.target.value;
        this.setState({ customerForm });
    };

    onSubmit = async e => {
        e.preventDefault();
        const inputs = e.target;
        const stripe_param = JSON.stringify({
            email: inputs.email.value,
        });
        let customer = await apiRequest({
            url: '/api/customers',
            method: 'get',
            params: { stripe_param },
        });

        if (customer.length) {
            this.setState({
                info: {
                    status: false,
                    message: `User ${customer[0].email} already exists`,
                },
            });
        } else {
            customer = await apiRequest({
                method: 'post',
                url: '/api/customers',
                params: {
                    email: inputs.email.value,
                    description: inputs.description.value,
                    account_balance: inputs.account_balance.value,
                },
            }).then(resp => {
                this.setState({
                    info: {
                        status: true,
                        message: 'User added ',
                    },
                });
                this.props.getCustomers()
            });
        }

    };

    render() {
        const {
            customerForm: { email, description, account_balance },
        } = this.state;
        let infoColor = this.state.info.status ? '#31969661' : '#ff1800b0';
        return (
            <Card className="">
                <CardContent>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.onSubmit}
                        onError={errors =>
                            console.log('ValidatorForm errors', errors)
                        }
                    >
                        <Grid container className="input-group">
                            <Grid item xs={12}>
                                <TextValidator
                                    id="email"
                                    name="email"
                                    label="Email"
                                    className="input"
                                    type="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    maxLength="10"
                                    onChange={this.handleChange}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    id="description"
                                    name="description"
                                    label="Short description"
                                    placeholder="Input short description"
                                    className="input"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChange}
                                    validators={['matchRegexp:^.{0,300}$']}
                                    errorMessages={['300 character limit']}
                                    value={description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    id="account_balance"
                                    name="account_balance"
                                    label="Balance"
                                    className="input"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChange}
                                    validators={[
                                        'required',
                                        'matchRegexp:^[0-9]*$',
                                    ]}
                                    errorMessages={[
                                        'this field is required',
                                        'field contains only numbers',
                                    ]}
                                    value={account_balance}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    className="input-group"
                                    spacing={16}
                                    alignItems="center"
                                >
                                    <Grid item xs={8}>
                                        {this.state.info.message ? (
                                            <p
                                                style={{
                                                    background: infoColor,
                                                    color: '#0a0f29',
                                                    padding: '10px',
                                                }}
                                            >
                                                {this.state.info.message}
                                            </p>
                                        ) : null}
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Button
                                            style={{ margin: '16px,0' }}
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            className=""
                                            type="submit"
                                            fullWidth
                                        >
                                            Add customer
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </CardContent>
            </Card>
        );
    }
}

export default CustomerForm;
