# Challenge 2-3 - "Joins" using `$lookup`

## Challenge

Use `$aggregate()` with `$lookup` to "join" customers an orders with the following queries:

1. Return a list of all customers and their orders.
   - The data should contain only the customer's name along with the list of their orders.
1. Return a list of all orders and their associated customer information.
   - Optional: use $project in the customer lookup to limit the amount of customer information returned

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/).  Take note of the SQL Equivalents.

## Solution

<details>
  <summary>Click to expand</summary>

## Challenge Question #1

```javascript
// Customers with all order details
db.customers.aggregate([
  {
    $lookup:
    {
      from: "orders",
      localField: "orders",
      foreignField: "_id",
      as: "orders"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      orders: 1,
    }
  }
])
```

### Expected Output

```javascript
[
  {
    name: 'Gene',
    orders: [
      {
        _id: ObjectId("6312f4a6f80e3117f621a468"),
        amount: Decimal128("5.99"),
        date: ISODate("2022-07-10T00:00:00.000Z"),
        customer: ObjectId("6312d9d228cec973e20022ff"),
        items: [
          {
            name: 'Widget',
            price: Decimal128("5.99"),
            quantity: Decimal128("1")
          }
        ]
      }
    ]
  },
  {
    name: 'Zach',
    ...
  }, ...
]
```

## Challenge Question #2

```javascript
db.orders.aggregate([
  {
    $lookup:
    {
      from: "customers",
      localField: "customer",
      foreignField: "_id",
      as: "customer",
      pipeline: [
        {
          $project: {
            _id: 0,
            name: 1
          }
        }
      ]
    }
  }
])
```

### Expected Output

```javascript
[
  {
    _id: ObjectId("6312f4a6f80e3117f621a46c"),
    amount: Decimal128("299.50"),
    date: ISODate("2022-07-11T00:00:00.000Z"),
    customer: [],
    items: [
      {
        name: 'Widget',
        price: Decimal128("5.99"),
        quantity: Decimal128("50")
      }
    ]
  },
  {
    _id: ObjectId("6312eed4f80e3117f621a464"),
    amount: Decimal128("25.99"),
    date: ISODate("2022-08-20T00:00:00.000Z"),
    customer: [ { name: 'Cathy' } ],
    items: [
      {
        name: 'Widget',
        price: Decimal128("5.99"),
        quantity: Decimal128("1")
      },
      {
        name: 'Widget Container',
        price: Decimal128("20.00"),
        quantity: Decimal128("1")
      }
    ]
  },...
]
```

</details>
