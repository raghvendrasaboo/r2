const {MongoClient} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'mudemy-project';

function fn() {
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log("Connected to MongoDb");
        const db = client.db(dbName);
    
        // db.collection('Todos').find().toArray().then((docs) => {
        //     console.log(JSON.stringify(docs, undefined,2));
            
        // }, (err) => {
        //     console.log(err);
            
        // });

        db.collection('Todos').find().count().then((count) => {
            console.log(`Counts: ${count}`);
            
        }, (err) => {
            console.log(err);
            
        });
        
        client.close();
    
        // db.collection("Todos").insertOne({
        //     text: "3rd todo",
        //     when: "Today"
        // }, (err, result) => {
        //     if (err)
        //         console.log("Error inserting");
        //     else
        //         console.log("Success inserting");
        // })
        //client.close();
    });
}

fn();

// async function asyncCall() {
//     var rows = await fn();
//     console.log(JSON.stringify(rows));
// }

// asyncCall();

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }