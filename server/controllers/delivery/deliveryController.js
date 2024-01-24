const { getDeliveryQuery } = require('../../queries/delivery/deliveryQueries');
const { driver } = require('../../database/setup');

async function getDelivery (req, res) {
    const session = driver.session();
    const query = getDeliveryQuery()
    try {
      const result = await session.run(query);
      const delivery = result.records.map(record => record.toObject());
      res.json({delivery});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } finally {
      session.close();
    }
}

module.exports = { getDelivery };