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