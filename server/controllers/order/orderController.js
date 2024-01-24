const { addOrderQuery } = require('../../queries/order/orderQueries');
const { driver } = require('../../database/setup');

function addOrder(req, res) {
    const session = driver.session();
    const requestBody = req.body;
    const { query, parameters } = addOrderQuery(requestBody);

    session
    .executeWrite((transaction) => {
        return transaction.run(query, parameters);
    })
    .then(() => {
        res.status(201).json({ message: 'Order created successfully' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    })
    .finally(() => {
        session.close();
    });
}


module.exports = { addOrder }