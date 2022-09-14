# Challenge 2-4 - `$mergeObjects` and `$replaceRoot`

## Challenge  1

Return a list of all orders, joined with their associated customer.

- The list returned should be a full, unfiltered and unshaped list of all order and customer properties.

## Challenge 2

Use `$aggregate()` with `$lookup` along with `$mergeObjects` and `$replaceRoot` to "join" customers an orders, and shape the output data as follows:

1. Return a list of every unique order with customer information attached, with the following properties:
   - name
   - addresses
   - customerld
   - orderld
   - amount
   - date
   - items

### Hints

> Need a hand? Check out the official documentation: [$mergeObjects](https://www.mongodb.com/docs/manual/reference/operator/aggregation/mergeObjects/) / [$replaceRoot](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/)

## Solution

<details>
  <summary>Click to expand</summary>

### Basic Join - huge array of nested objects

```javascript
db.orders.aggregate([
  {
    $lookup:
    {
      from: "customers",
      localField: "customer",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $limit: 1 }
]);
```

### Expected Output

```javascript
[
  {
    _id: ObjectId("6312eed4f80e3117f621a464"),
    amount: Decimal128("25.99"),
    date: ISODate("2022-08-20T00:00:00.000Z"),
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
    ],
    customer: [
      {
        _id: ObjectId("6312d87c9df14eea7e2ca9e3"),
        name: 'Cathy',
        email: 'cathy@example.com',
        phone: '206-555-2222',
        active: true,
        customerSince: ISODate("2021-09-12T00:00:00.000Z"),
        favoriteCategories: [ 'food', 'sports', 'clothing' ],
        addresses: {
          shipping: {
            address: '123 Main St',
            city: 'Some Town',
            state: 'WA',
            zip: '12345'
          },
          billing: {
            address: '123 Bank St',
            city: 'Some Town',
            state: 'WA',
            zip: '12345'
          }
        },
        orders: [
          ObjectId("6312eec6f80e3117f621a463"),
          ObjectId("6312eed4f80e3117f621a464")
        ]
      }
    ]
  }, ...
]
```

### Same data, but shaped using `$replaceRoot` and `$mergeObjects`

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
          $addFields: {
            customerId: { $toString: "$_id" }
          }
        },
        { $project: { _id: 0 } },
        { $project: { customerId: 1, name: 1, addresses: 1 } }
      ]
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{ $arrayElemAt: ["$customer", 0] }, "$$ROOT"]
      }
    }
  },
  {
    $addFields: {
      orderId: { $toString: "$_id" }
    }
  },
  {
    $project: { _id: 0, customer: 0 }
  },
  { $limit: 1 }
])

```

### Expected Output

```javascript
[
  {
    name: 'Cathy',
    addresses: {
      shipping: {
        address: '123 Main St',
        city: 'Some Town',
        state: 'WA',
        zip: '12345'
      },
      billing: {
        address: '123 Bank St',
        city: 'Some Town',
        state: 'WA',
        zip: '12345'
      }
    },
    customerId: '6312d87c9df14eea7e2ca9e3',
    amount: Decimal128("25.99"),
    date: ISODate("2022-08-20T00:00:00.000Z"),
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
    ],
    orderId: '6312eed4f80e3117f621a464'
  },
]
```

</details>
