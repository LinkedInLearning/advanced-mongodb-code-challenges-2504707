# Challenge 1-1 - Aggregation Pipelines

## Challenge

Use the `aggregate()` method to run the following query in the customers collection:

1. Count of all active customers

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
// How many active customers do we have?

db.customers.aggregate(
  [
    {
      $match: {
        active: true
      }
    },
    {
      $count: "active_customers"
    }
  ]
)
```

### Expected Output

```javascript
[
  { active_customers: 7 }
]
```

</details>
