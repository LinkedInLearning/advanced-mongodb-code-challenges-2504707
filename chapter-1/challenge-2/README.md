# Challenge 1-2 - Grouping results in a pipeline

## Challenge

Use the `aggregate()` method to run the following query in the customers collection:

1. Return a list of every date in the year 2022, with the total amount of all orders placed on that date, sorted by date (earliest first)
   - HINT: You'll need to use a `$group` in your aggregation

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
db.orders.aggregate([
  {
    $match:
    {
      "date": { $gte: new ISODate("2022-01-01"), $lt: new ISODate("2022-12-31") }
    }
  },
  {
    $group:
    {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
      amount: { $sum: "$amount" },
    }
  },
  {
    $sort: { _id: 1 }
  }
])
```

### Expected Output

```javascript
[
  { _id: '2022-07-11', amount: Decimal128("299.50") },
  { _id: '2022-07-10', amount: Decimal128("75.94") },
  { _id: '2022-08-20', amount: Decimal128("45.99") },
  { _id: '2022-07-20', amount: Decimal128("45.94") },
  { _id: '2022-08-30', amount: Decimal128("5.99") }
]
```

</details>
