// Order Totals, grouped by date

db.orders.aggregate([
  {
    $match:
    {
      "date": { $gte: new ISODate("2022-01-01"), $lt: new ISODate("2022-12-31") }
    }
  },
  {
    $group:
    {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
      amount: { $sum: "$amount" },
    }
  },
  {
    $sort: { amount: -1 }
  }
])