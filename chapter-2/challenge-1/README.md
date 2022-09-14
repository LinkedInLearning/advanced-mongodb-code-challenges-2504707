# Challenge 2-1 - Document References

## Challenge

Use `findOne()` to run the following queries:

1. Return the full customer document associated with an order, given an order id
   - Use `findOne()` to obtain a customer id from an order and then use that to return a customer using `findOne()`) with that ID. This should be a nested call.
   
Note: Begin by using Compass or a `find()` to first find a valid order id and work these queries with that _id

### Hints

> Need a hand? Check out the official documentation: [findOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/) / [find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
// Use an object to find an object
db.customers.findOne({
  _id: db.orders.findOne({ _id: ObjectId("6312f4a6f80e3117f621a469") }, { customer: 1, _id: 0 }).customer
})
```

### Expected Output

```javascript
{
  _id: ObjectId("6312d87c9df14eea7e2ca9e4"),
  name: 'Zach',
  email: 'zach@example.com',
  phone: '206-555-3333',
  active: true,
  customerSince: ISODate("2022-06-17T00:00:00.000Z"),
  favoriteCategories: [ 'sports' ],
  addresses: {
    billing: {
      address: '123 Main St',
      city: 'Some Town',
      state: 'WA',
      zip: '12345'
    }
  },
  orders: [
    ObjectId("6312f4a6f80e3117f621a46a"),
    ObjectId("6312f4a6f80e3117f621a469")
  ]
}
```

</details>
