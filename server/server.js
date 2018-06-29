const axios = require("axios");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//default endpoint
app.get("/", (req, res) => {
  res.send("23andMe API at your service. Try: /accession, /marker");
});

//will return base count of chromosome
// "https://api.23andme.com/3/accession/?chromosome=1"
//curl "https://api.23andme.com/3/accession/NC_000001.10"
app.get("/accession", (req, res) => {
  axios
    .get("https://api.23andme.com/3/accession/NC_012920.1")
    .then(response => {
      res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// will return a list of SNP markers for that gene(not full list in gene, must be list of snps used by 23andMe...): "https://api.23andme.com/3/marker/?gene_name=ACTN3"

// will return a list of markers that match those ids: curl "https://api.23andme.com/3/marker/?id=rs10195681,i4001358"
//  will return a list of markers on that chromosome: curl "https://api.23andme.com/3/marker/?accession_id=NC_012920.1"
app.get("/marker", (req, res) => {
  axios
    .get("https://api.23andme.com/3/marker/?gene_name=TP53")
    .then(response => {
      console.log(
        "number of snps in this list =======> ",
        response.data.data.length
      );
      res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

const server = app.listen(port, () => {
  console.log(`now listening on port ${port}! `);
});
