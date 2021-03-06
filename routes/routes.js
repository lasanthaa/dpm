var patientMock = require("../db")

var appRouter = function(app) {

  app.get("/", function(req, res) {
    res.send("Hello World");
  });

  app.get("/patient", function(req, res) {

    console.log(patientMock)

    if(!req.query.patient_addr) {
      return res.send({"status": "error", "message": "missing patient_addr"});
    } else if(req.query.patient_addr != patientMock.patient_addr) {
      console.log(req.query.patient_addr)
      return res.send({"status": "error", "message": "wrong patient_addr"});
    } else {
      return res.send(patientMock);
    }
  });

  app.post("/patient", function(req, res) {
    if (!req.body.patient_addr || !req.body.prescription_addr) {
      return res.send({"status": "error", "message": "missing a parameter"});
    } else {
      DrugStoreContract.start()
      DrugStoreContract.verify(req.body.patient_addr, req.body.prescription_addr)
    }
  });
}

module.exports = appRouter;
