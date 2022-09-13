# Challenge 1-3 - Shaping data with `$project`

## Challenge

Use the `aggregate()` method with `$project` to run the following queries in the customers collection:

1. All customers, but shape the output by only returning their name and favorite categories.
1. Same query ... but this time, rename the property `favoriteCategories` to `faves`

Consider:

- Why use projections? We very often have to shape the output to satisfy an API's expectations for the shape of data returned

### Hints

> Need a hand? Check out the [official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)

## Solution

<details>
  <summary>Click to expand</summary>

```javascript
// Rename a field to further "Shape" the output by first adding it, then allowing it
db.customers.aggregate([
  {
    $addFields: {
      faves: "$favoriteCategories"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      faves: 1
    }
  }
])
```

### Expected Output

```javascript
[
  { name: 'Gene', faves: [ 'sports' ] },
  { name: 'Zach', faves: [ 'sports' ] },
  { name: 'Cathy', faves: [ 'food', 'sports', 'clothing' ] },
  { name: 'Josie', faves: [ 'food' ] },
  { name: 'Allie', faves: [ 'clothing' ] },
  { name: 'Rosie', faves: [ 'food' ] },
  { name: 'Luna' }
]
```

</details>
