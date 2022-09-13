// Customers Cursor, travels through the DB
let cursor = db.customers.find({ _id: ObjectId('6312d87c9df14eea7e2ca9e4') });

// Traditional cursor iteration
while (cursor.hasNext()) {
  let customer = cursor.next();
  customer.orders.forEach((orderId, idx) => {
    let order = db.orders.find({ _id: ObjectId(orderId.toString()) })
    print(order);
  })
}

// With a forEach ...
// cursor.forEach(customer => {
//   print(customer);
//   customer.orders.forEach((orderId, idx) => {
//     let order = db.orders.find({ _id: ObjectId(orderId.toString()) })
//     print(order);
//   })
// });