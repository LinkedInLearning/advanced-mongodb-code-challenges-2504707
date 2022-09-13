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