// Delivery Nodes
CREATE (d1:Delivery {id: apoc.create.uuid(), type: 'Standard Shipping', price: 5.99}),
       (d2:Delivery {id: apoc.create.uuid(), type: 'Express Shipping', price: 9.99}),
       (d3:Delivery {id: apoc.create.uuid(), type: 'Overnight Shipping', price: 19.99});

// Category Nodes
CREATE (c1:Category {id: apoc.create.uuid(), name: 'Tops'}),
       (c2:Category {id: apoc.create.uuid(), name: 'Bottoms'}),
       (c3:Category {id: apoc.create.uuid(), name: 'Accessories'});

// Clothing Items Nodes
CREATE (p1:Product {
            id: apoc.create.uuid(),
            title: 'Cotton T-shirt',
            imageUrl: 'https://static.zarahome.net/assets/public/fb7b/f646/4dba45eb865d/49dda658d380/48102120712-p1/48102120712-p1.jpg?ts=1733238483512',
            price: 19.99,
            count: 200,
            shortDescription: 'Soft cotton t-shirt for everyday wear.',
            longDescription: 'A classic short-sleeve cotton t-shirt that comes in multiple colors, perfect for casual outings or lounging.'
        }),
       (p2:Product {
            id: apoc.create.uuid(),
            title: 'Jeans - Slim Fit',
            imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_4df51c37-696c-4c43-a96f-4ea12334ab5f?wid=488&hei=488&fmt=pjpeg',
            price: 39.99,
            count: 150,
            shortDescription: 'Slim fit jeans with stretchable fabric.',
            longDescription: 'Stylish slim-fit jeans with a modern design, made with a comfortable stretch fabric for ease of movement.'
        }),
       (p3:Product {
            id: apoc.create.uuid(),
            title: 'Leather Jacket',
            imageUrl: 'https://images.hugoboss.com/is/image/boss/hbeu50522223_001_350?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1735509919000&wid=1200&hei=1818',
            price: 89.99,
            count: 50,
            shortDescription: 'Premium leather jacket for a sleek look.',
            longDescription: 'A sleek and durable leather jacket, designed to provide warmth and style with a perfect fit.'
        });

// Review Nodes
CREATE (r1:Review {
            id: apoc.create.uuid(),
            rating: 5,
            reviewBody: 'Perfect t-shirt, fits well and super comfortable!',
            reviewerName: 'John Doe'
        }),
       (r2:Review {
            id: apoc.create.uuid(),
            rating: 4,
            reviewBody: 'Nice fit, but a bit tight around the waist.',
            reviewerName: 'Jane Smith'
        }),
       (r3:Review {
            id: apoc.create.uuid(),
            rating: 5,
            reviewBody: 'This jacket is amazing! High quality and fits great.',
            reviewerName: 'Samuel Green'
        });

// Relationships
// Product to Category (BELONGS_TO)
MATCH (p1:Product {title: 'Cotton T-shirt'}), (c1:Category {name: 'Tops'})
CREATE (p1)-[:BELONGS_TO]->(c1);

MATCH (p2:Product {title: 'Jeans - Slim Fit'}), (c2:Category {name: 'Bottoms'})
CREATE (p2)-[:BELONGS_TO]->(c2);

MATCH (p3:Product {title: 'Leather Jacket'}), (c1:Category {name: 'Tops'})
CREATE (p3)-[:BELONGS_TO]->(c1);

// Review to Product (REVIEWS)
MATCH (p1:Product {title: 'Cotton T-shirt'}), (r1:Review {reviewerName: 'John Doe'})
CREATE (r1)-[:REVIEWS]->(p1);

MATCH (p2:Product {title: 'Jeans - Slim Fit'}), (r2:Review {reviewerName: 'Jane Smith'})
CREATE (r2)-[:REVIEWS]->(p2);

MATCH (p3:Product {title: 'Leather Jacket'}), (r3:Review {reviewerName: 'Samuel Green'})
CREATE (r3)-[:REVIEWS]->(p3);