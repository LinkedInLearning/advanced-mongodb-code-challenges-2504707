# Challenge 1-6 - Aggregation Functions

## Challenge

Use an `aggregate()` function with a `$function` to run the following query in the customers collection:

1. Return a list of customers and the the count of their `favoriteCategories`
   - The output should contain only the customer's name and a field called `numberOfFavorites`

- NOTE: As with accumulators, this will seem like "overkill" but the basis for this technique will unlock a powerful tool for you.

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/function/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
db.customers.aggregate([
  {
    $match: {
      active: true,
      favoriteCategories: { $exists: true }
    }
  },
  {
    $addFields:
    {
      numberOfFavorites:
      {
        $function:
        {
          body: function (faves) {
            return faves.length
          },
          args: ["$favoriteCategories"],
          lang: "js"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      numberOfFavorites: 1
    }
  }
])
```

### Expected Output

```javascript
[
  { name: 'Gene', numberOfFavorites: 1 },
  { name: 'Zach', numberOfFavorites: 1 },
  { name: 'Cathy', numberOfFavorites: 3 },
  { name: 'Josie', numberOfFavorites: 1 },
  { name: 'Allie', numberOfFavorites: 1 },
  { name: 'Rosie', numberOfFavorites: 1 }
]
```

</details>
