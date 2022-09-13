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