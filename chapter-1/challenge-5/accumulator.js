// Average number of favorites, by state
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

// Extra Credit: Same as above, but homespun
db.customers.aggregate([
  {
    $match: { favoriteCategories: { $exists: true } }
  },
  {
    $group:
    {
      _id: "$addresses.shipping.state",
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
  }
])


