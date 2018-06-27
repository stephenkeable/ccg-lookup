const parse = require('csv-parse');
const fs = require('fs');
const transform = require('stream-transform');

const csvSource = "./CCG names and codes UK as at 04_18.csv";

let output = [];
const parser = parse({delimiter: ','})
const input = fs.createReadStream(csvSource);

const transformer = transform(function(record, callback){
    output.push(record); // add row to array
    callback(null, record.join(' ')+'\n');
}, {parallel: 1}); // row by row

input.pipe(parser).pipe(transformer).pipe(process.stdout); // Process CSV and output to terminal

input.on('end', () => {
  let outputRows = output;
  outputRows.shift(); // Remove header row
  let jsonObject = {};

  for (let row of outputRows) {
    let gssCode = row[0] || "";
    let nhsCode = row[1] || "";
    jsonObject[gssCode] = nhsCode; // Add row to the jsonObject with gss code as key and nhs code as value
  }

  // Output the object to the file
  fs.writeFile("./ccg-data.min.json", JSON.stringify(jsonObject), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

});
