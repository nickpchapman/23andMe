const axios = require("axios");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//default endpoint
app.get("/", (req, res) => {
  res.send("23andMe API at your service. Try: /accession, /marker");
});

// ========== Accessions  ==========
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

// ========== SNP Markers ==========
// will return a list of reference SNP markers used in specified gene. Each marker contains an rs# and array of variant alleles: "https://api.23andme.com/3/marker/?gene_name=ACTN3"
// will return a list of markers that match those ids: curl "https://api.23andme.com/3/marker/?id=rs10195681,i4001358"
//  will return a list of markers on that chromosome: curl "https://api.23andme.com/3/marker/?accession_id=NC_012920.1"

app.get("/marker", (req, res) => {
  axios
    .get("https://api.23andme.com/3/marker/?gene_name=ACTN3")
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

// ========== SNP variants ==========
// will return a list of ungrouped variant alleles for specified gene in asending order: "https://api.23andme.com/3/variant/?gene_name=ACTN3"
//can also

app.get("/variant", (req, res) => {
  axios
    .get("https://api.23andme.com/3/variant/?gene_name=ACTN3")
    .then(response => {
      res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// ========= Example Report =========
//will return sample report object for the following catagories:
// genetic_weight
// wellness.alcohol_flush_reaction
// wellness.caffeine_consumption
// wellness.deep_sleep
// wellness.lactose
// wellness.muscle_composition
// wellness.saturated_fat_and_weight
// wellness.sleep_movement

app.get("/report", (req, res) => {
  axios
    .get("https://api.23andme.com/3/report/")
    .then(response => {
      res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get("/gpri", (req, res) => {
  axios
    .get(
      "https://api.23andme.com/3/genetic_phenotype_range_interaction/?predictor_id=linear_regression.gbmi.european_genetics_only_bmi_predictor"
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

const server = app.listen(port, () => {
  console.log(`now listening on port ${port}! `);
});
