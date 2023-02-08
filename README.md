# Unexpected 2023 Update

I decided to update the tool to reflect the change to ICBs which the postcodes.io API returns in place of the now defunct CCGs. Also rather than building the lookups from NHSPD the tool just takes the codes straight from that API too.

# CCG Lookup
Basic tool to lookup Clincial Commissioning Group (CCG) names or codes using just a UK postcode.

https://stephenkeable.github.io/ccg-lookup/

## ~~Updating the NHS data~~

~~[Find the latest version of the NHSPD here](http://geoportal.statistics.gov.uk/search?q=NHS%20Postcode%20Directory) (Not always in the most useful sort order)~~

~~Download the ZIP file, Extract and in the `Documents` directory should be CSV file with the name beginning `CCG names and codes UK as at` with a month and year after.~~

~~Such as `CCG names and codes UK as at 04_18.csv` place this file in the same directory as `data.js`~~

~~`data.js` is Node JS script used to build the `ccg-data.min.json` file from the CSV above.~~

~~From your terminal you'll need to run `npm install` to install Node dependencies.~~

~~Modify the line below so the filename matches the most recent version from the NHSPD:-~~

~~`const csvSource = "./CCG names and codes UK as at 04_18.csv";`~~

~~Then back in the terminal run `node data.js`~~

~~This will update the `ccg-data.min.json` file.~~

## Credits
Lookup API from [postcodes.io](https://postcodes.io)

Contains National Statistics data © Crown copyright and database right 2019
