const app = require('express')();
const cors = require('cors');
const stripe = require('stripe')('sk_test_Z3RxLEb8ePEP9jtfLdsoIWJO');

app.use(require('body-parser').text());
app.use(cors());

app.get('/api/customers', async (req, res) => {
    try {
        let stripe_param = {}
        if(req.query.stripe_param){
            stripe_param = JSON.parse(req.query.stripe_param);
        }else{
            stripe_param =  {
                limit: 500
            }
        }


        let customers = await stripe.customers.list(stripe_param);
        res.json(customers.data);
    } catch (err) {
        console.log(err.message);
        res.json([]);
        //res.status(500).end();
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        let customers = await stripe.customers.list({ email: req.query.email });
        if (customers.data.length) {
            res.json({});
        } else {
            customers = await stripe.customers.create(req.query);
            res.json(customers.id);
        }
    } catch (err) {
        console.log(err.message);
        res.json([]);
        //res.status(500).end();
    }
});

app.listen(9000, () => console.log('Listening on port 9000'));
