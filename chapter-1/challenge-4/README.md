# Challenge 1-4 - Calculated Fields

## Challenge

Use the `aggregate()` method with `$project` to run the following queries in the customers collection:

1. All customers, but shape the output by only returning their name and the number of `favoriteCategories` for each
1. The average number of customer `favoriteCategories`, grouped by the `state` for their billing address.

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
      favorites: "$favoriteCategories"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      favorites: { $size: "$favorites" }
    }
  }
])

// OUTPUT:

[
  { name: 'Gene', favorites: 1 },
  { name: 'Zach', favorites: 1 },
  { name: 'Cathy', favorites: 3 },
  { name: 'Josie', favorites: 1 },
  { name: 'Allie', favorites: 1 },
  { name: 'Rosie', favorites: 1 }
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

// OUTPUT

[
  { avgFavorites: 2, state: 'NJ' }
  { avgFavorites: 1, state: 'FL' }
  { avgFavorites: 1.5, state: 'WA' }

]

```

</details>
