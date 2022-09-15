# Setup Your Environment

## Step 1: Create your database

1. In MongoShell or within Compass, create a new database named `store`
1. Copy the contents of the `store-schema.js` file in this repository
1. Open MongoShell from your terminal or from within the Compass UI
1. Paste in the contents, which contains your database schema definitions and run the command
1. Verify that your collections have been created
   - In MongoShell, run the command `show collections`
   - In Compass, refresh the store database to see that your collections are there
1. Verify that the schema validation rules have been created
   - In Compass, select each collection and then view the Validation Tab
   
## Step 2: Import sample data

1. Download both the `store-customers.json` and the `store-orders.json` files from this repository
1. Import these JSON files into your customers and orders collections respectively
1. If you are using only the terminal, the command to run is as follows
   - Note: use the correct Mongo URI for your server and change the collection/file name for each file as you import
   `mongoimport --uri <your mongo server uri here> --collection customers --type json --jsonArray --file ./store-customers.json`
1. If you prefer to use Compass, choose your collection in the UI and then click the "Add Data" button and follow the instructions.
