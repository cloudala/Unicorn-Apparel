const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

// Establish Neo4j connection
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

// Example route to retrieve nodes from Neo4j
router.get('/api/nodes', async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (n) RETURN n');
    session.close();

    const nodes = result.records.map(record => record.get('n').properties);
    res.json(nodes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Close the Neo4j driver when the app exits
process.on('exit', () => {
  driver.close();
});

module.exports = router;