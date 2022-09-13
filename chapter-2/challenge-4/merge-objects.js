db.orders.aggregate([
  {
    $lookup:
    {
      from: "customers",
      localField: "customer",
      foreignField: "_id",
      as: "customer"
    }
  },
]);


// Now, let's reshape that into a flatter structure

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
          $addFields: {
            customerId: { $toString: "$_id" }
          }
        },
        { $project: { _id: 0 } },
        { $project: { customerId: 1, name: 1, addresses: 1 } }
      ]
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{ $arrayElemAt: ["$customer", 0] }, "$$ROOT"]
      }
    }
  },
  {
    $addFields: {
      orderId: { $toString: "$_id" }
    }
  },
  {
    $project: { _id: 0, customer: 0 }
  },
])