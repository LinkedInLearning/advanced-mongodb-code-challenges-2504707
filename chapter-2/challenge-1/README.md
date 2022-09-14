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
  _id: db.orders.findOne({ _id: ObjectId("6312f4a6f80e3117f621a468") }, { customer: 1, _id: 0 }).customer
})
```

### Expected Output

```javascript
{
  _id: ObjectId("6312d9d228cec973e20022ff"),
  name: 'Gene',
  email: 'gene@exmple.com',
  phone: '555-1212',
  active: false,
  customerSince: 2021-10-30T00:00:00.001Z,
  favoriteCategories: [ 'sports' ],
  addresses: 
   { billing: 
      { address: '222 Some Rd',
        city: 'Some Town',
        state: 'FL',
        zip: '12345' } },
  orders: [ ObjectId("6312f4a6f80e3117f621a468") ] 
}
```

</details>
