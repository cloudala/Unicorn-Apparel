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

// Endpoint for getting all products
router.get('/api/products', async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run(`
      MATCH (p:Product)-[:BELONGS_TO]->(c:Category)
      OPTIONAL MATCH (p)<-[:REVIEWS]-(r:Review)
      WITH p, c, AVG(r.rating) AS averageRating
      RETURN p.id, p.title, p.imageUrl, c.name AS category, toFloat(p.price) AS price, p.shortDescription, p.longDescription, toInteger(p.count) AS count, averageRating
    `);
    session.close();

    const products = result.records.map(record => {
      const averageRating = record.get('averageRating');
      return {
        id: record.get('p.id'),
        title: record.get('p.title'),
        imageUrl: record.get('p.imageUrl'),
        category: record.get('category'),
        price: parseFloat(record.get('price')),
        shortDescription: record.get('p.shortDescription'),
        longDescription: record.get('p.longDescription'),
        count: record.get('count').toNumber(),
        averageRating: averageRating !== null ? parseFloat(averageRating) : null,
      };
    });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for getting product with given ID
router.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const session = driver.session();
    const result = await session.run(`
      MATCH (p:Product {id: $productId})-[:BELONGS_TO]->(c:Category)
      OPTIONAL MATCH (p)<-[:REVIEWS]-(r:Review)
      WITH p, c, AVG(r.rating) AS averageRating
      RETURN p.id, p.title, p.imageUrl, c.name AS category, toFloat(p.price) AS price, p.shortDescription, p.longDescription, toInteger(p.count) AS count, averageRating
    `, { productId });
    session.close();

    const [record] = result.records;

    if (!record) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const averageRating = record.get('averageRating');
    const product = {
      id: record.get('p.id'),
      title: record.get('p.title'),
      imageUrl: record.get('p.imageUrl'),
      category: record.get('category'),
      price: parseFloat(record.get('price')),
      shortDescription: record.get('p.shortDescription'),
      longDescription: record.get('p.longDescription'),
      count: record.get('count').toNumber(),
      averageRating: averageRating !== null ? parseFloat(averageRating) : null,
    };

    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for adding a new product
// TO DO: add req.body validation (so that the query isn't run with invalid data)
router.post('/api/products', (req, res) => {
  const productData = req.body;
  const session = driver.session();

  session
    .executeWrite((transaction) => {
      const query = `
        WITH $productData AS productData
        // Create or retrieve the category node using APOC
        CALL apoc.merge.node(['Category'], {name: productData.category}, {})
        YIELD node AS category

        // Create the new product node using APOC
        CALL apoc.create.node(['Product'], {
          id: apoc.create.uuid(),
          title: productData.title,
          imageUrl: productData.imageUrl,
          price: productData.price,
          shortDescription: productData.shortDescription,
          longDescription: productData.longDescription,
          count: productData.count
        }) YIELD node AS product

        // Create BELONGS_TO relationship using APOC
        CALL apoc.create.relationship(product, 'BELONGS_TO', {}, category)
        YIELD rel

        RETURN product, category;
      `;

      return transaction.run(query, { productData });
    })
    .then((result) => {
      const createdProduct = result.records[0].get('product').properties;
      const productCategory = result.records[0].get('category').properties;

      res.status(201).json({ product: createdProduct, category: productCategory });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    })
    .finally(() => {
      session.close();
    });
});

// Endpoint for deleting product with a given id
router.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const session = driver.session();

  session
    .executeWrite((transaction) => {
      const query = `
        MATCH (product:Product {id: $productId})-[:BELONGS_TO]->(category:Category)
        WITH product, category
        DETACH DELETE product
        WITH category
        WHERE NOT EXISTS(()-[:BELONGS_TO]->(category))
        DETACH DELETE category
        RETURN category;
      `;

      return transaction.run(query, { productId });
    })
    .then((result) => {
      const deletedCategory = result.records[0]?.get('category')?.properties;
      if (deletedCategory) {
        res.status(200).json({ message: 'Product and category deleted successfully.' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully.' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    })
    .finally(() => {
      session.close();
    });
});

// Endpoint for getting all reviews for product with a given id
router.get('/api/products/:id/reviews', async (req, res) => {
  try {
    const productId = req.params.id;
    const session = driver.session();
    const result = await session.run(`
      MATCH (product:Product {id: $productId})<-[:REVIEWS]-(review:Review)
      RETURN review.id AS reviewId, review.rating, review.reviewerName, review.reviewBody
    `, { productId });
    session.close();

    const reviews = result.records.map(record => ({
      reviewId: record.get('reviewId'),
      rating: record.get('review.rating').toNumber(),
      reviewerName: record.get('review.reviewerName'),
      reviewBody: record.get('review.reviewBody'),
    }));

    res.json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for creating a new review for a product
// TO DO: add req.body validation (so that the query isn't run with invalid data)
router.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, reviewerName, reviewBody } = req.body;

    const session = driver.session();
    const result = await session.run(`
      MATCH (product:Product {id: $productId})
      CREATE (review:Review {
        id: apoc.create.uuid(),
        rating: toInteger($rating),
        reviewerName: $reviewerName,
        reviewBody: $reviewBody
      })-[:REVIEWS]->(product)
      RETURN review.id AS reviewId, review.rating, review.reviewerName, review.reviewBody
    `, { productId, rating, reviewerName, reviewBody });
    session.close();

    const createdReview = result.records[0];

    if (!createdReview) {
      return res.status(404).json({ error: 'Failed to create review' });
    }

    const review = {
      reviewId: createdReview.get('reviewId'),
      rating: createdReview.get('review.rating').toNumber(),
      reviewerName: createdReview.get('review.reviewerName'),
      reviewBody: createdReview.get('review.reviewBody'),
    };

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for deleting a review for a product
router.delete('/api/products/:id/reviews/:reviewId', async (req, res) => {
  try {
    const productId = req.params.id;
    const reviewId = req.params.reviewId;
    const session = driver.session();
    const result = await session.run(`
      MATCH (product:Product {id: $productId})<-[r:REVIEWS]-(review:Review {id: $reviewId})
      DELETE review, r
    `, { productId, reviewId });
    session.close();

    if (result.summary.counters.nodesDeleted === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(204).send(); // 204 No Content (successful deletion)
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