// Customers with all order details
db.customers.aggregate([
  {
    $lookup:
    {
      from: "orders",
      localField: "orders",
      foreignField: "_id",
      as: "orders"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      orders: 1,
    }
  }
])

// Orders with customer detail
db.orders.aggregate([
  {
    $lookup:
    {
      from: "customers",
      localField: "customer",
      foreignField: "_id",
      as: "customer",
      pipeline: [
        {
          $project: {
            _id: 0,
            name: 1
          }
        }
      ]
    }
  }

])
