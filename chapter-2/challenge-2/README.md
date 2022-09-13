# Challenge 2-2 - Using a cursor to loop and process results

## Challenge

Declare a cursor with `find()` and use a loop to perform a subsequent lookup.

1. Return a list of all orders (with details) for a given customer
   - Use Compass or a `find()` to first find a valid customer id and start by finding that customer.
   - Traverse the cursor with a `while()` loop, looking up the customer orders.
   - Repeat the process, this time, traversing the cursor with a `forEach()` loop, looking up the customer orders.

Consider:

- What happens if you run your query using the `forEach()` loop immediately after the query with the `while()` loop? Why?

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/v5.3/tutorial/iterate-a-cursor/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
// Customers Cursor, travels through the DB
let cursor = db.customers.find({ _id: ObjectId('6312d87c9df14eea7e2ca9e4') });

// Traditional cursor iteration
while (cursor.hasNext()) {
  let customer = cursor.next();
  customer.orders.forEach((orderId, idx) => {
    let order = db.orders.find({ _id: ObjectId(orderId.toString()) })
    print(order);
  })
}

// With a forEach ...
cursor.forEach(customer => {
  print(customer);
  customer.orders.forEach((orderId, idx) => {
    let order = db.orders.find({ _id: ObjectId(orderId.toString()) })
    print(order);
  })
});

```

### Expected Output

```javascript
[
  {
    _id: ObjectId("6312f4a6f80e3117f621a469"),
    amount: Decimal128("51.98"),
    date: ISODate("2022-07-10T00:00:00.000Z"),
    customer: ObjectId("6312d87c9df14eea7e2ca9e4"),
    items: [
      {
        name: 'Widget',
        price: Decimal128("11.98"),
        quantity: Decimal128("2")
      },
      {
        name: 'Widget Box',
        price: Decimal128("20.00"),
        quantity: Decimal128("2")
      }
    ]
  }
]
```

</details>
