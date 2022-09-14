# Challenge 1-5 - Accumulators

## Challenge

Use the `aggregate()` method with an `$accumulator` to run the following queries in the customers collection:

1. Using "normal" aggregation, return the average number of customer `favoriteCategories`, grouped by `state`
1. Repeat that query, but use an $accumulator to perform the calculation

*NOTE: This will seem like "overkill" but the basis for this technique will unlock a powerful tool for you.*

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/accumulator/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
// Average number of favorites, by state
db.customers.aggregate([
  {
    $match: { favoriteCategories: { $exists: true } }
  },
  {
    $group: {
      _id: "$addresses.billing.state",
      avgFavorites: { $avg: { $size: "$favoriteCategories" } }
    }
  },
  {
    $project: {
      _id: false,
      state: "$_id",
      avgFavorites: true
    }
  }
])

// Extra Credit: Same as above, but homespun
db.customers.aggregate([
  {
    $match: { favoriteCategories: { $exists: true } }
  },
  {
    $group:
    {
      _id: "$addresses.billing.state",
      avgFavorites:
      {
        $accumulator:
        {
          // Set the initial state
          init: function () {
            return { count: 0, sum: 0 }
          },

          // Define how to update the state
          accumulate: function (state, numFaves) {
            return {
              count: state.count + 1,
              sum: state.sum + numFaves
            }
          },

          // Argument required by the accumulate function
          accumulateArgs: [{ $size: "$favoriteCategories" }],

          // When the operator performs a merge, add fields from the two states
          merge: function (state1, state2) {
            return {
              count: state1.count + state2.count,
              sum: state1.sum + state2.sum
            }
          },

          // After collecting the results from all documents, calculate the avg
          finalize: function (state) {
            return (state.sum / state.count)
          },
          lang: "js"
        }
      }
    }
  },
  {
    $project: {
      _id: false,
      state: "$_id",
      avgFavorites: true
    }
  }
])

```

### Expected Output

```javascript
[
  { _id: 'WA', avgFavorites: 1.6666666666666667 },
  { _id: null, avgFavorites: 1 }
]
```

</details>
