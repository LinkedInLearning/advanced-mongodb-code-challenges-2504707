# Challenge 1-4 - Calculated Fields

## Challenge

Use the `aggregate()` method with `$project` to run the following queries in the customers collection:

1. All customers, but shape the output by only returning their name and the number of `favoriteCategories` for each
1. The average number of customer `favoriteCategories`, grouped by `state`

Consider:

- What happens if a customer document doesn't have the favoriteCategories property?
- How can you mitigate this issue?

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/) for one type of calculation (average)

## Solution

<details>
  <summary>Click to expand</summary>

### Challenge Question 1

```javascript
// Calculated Projection
db.customers.aggregate([
  {
    $match: { favoriteCategories: { $exists: true } }
  },
  {
    $addFields: {
      faves: "$favoriteCategories"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      faves: { $size: "$faves" }
    }
  }
])

// OUTPUT:

[
  { name: 'Gene', faves: 1 },
  { name: 'Zach', faves: 1 },
  { name: 'Cathy', faves: 3 },
  { name: 'Josie', faves: 1 },
  { name: 'Allie', faves: 1 },
  { name: 'Rosie', faves: 1 }
]

```

### Challenge Question 2

```javascript

// Average number of favorites, by state
// It's easy to remember these with english ... { $avg: { $size: {thing} } } say "Average 'of' the size 'of' ... " and it'll start coming together
db.customers.aggregate([
  {
    $match: { favoriteCategories: { $exists: true } }
  },
  {
    $group: {
      _id: "$addresses.shipping.state",
      avgFavorites: { $avg: { $size: "$favoriteCategories" } }
    }
  }
])

// OUTPUT

[
  { _id: null, avgFavorites: 1 },
  { _id: 'WA', avgFavorites: 1.6666666666666667 }
]

```

</details>
