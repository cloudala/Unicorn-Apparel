function getDeliveryQuery() {
    const query = 'MATCH (n:Delivery) RETURN n.id AS id, n.type AS type, n.price AS price'
  
    return query;
}
  
module.exports = { getDeliveryQuery };