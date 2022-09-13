// Array
db.orders.find({ _id: ObjectId("6312f4a6f80e3117f621a469") })

// Single Object
db.orders.findOne({ _id: ObjectId("6312f4a6f80e3117f621a469") })

// Use an object to find an object
db.customers.findOne({
  _id: db.orders.findOne({ _id: ObjectId("6312f4a6f80e3117f621a469") }, { customer: 1, _id: 0 }).customer
})