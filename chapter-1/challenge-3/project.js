// Cherry pick the fields we want ... notice how we screen out the _id


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
