const express = require("express");
const cluster = require("cluster");
const os = require("os");
const noOfCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < noOfCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  app.get("/", (req, res) => {
    console.log(fibonacci(40));
    console.log(`Worker ID: ${cluster.worker.id}, Process ID: ${process.pid}`);
    return res.json({
      message: `Hello from Express.js Worker ${cluster.worker.id}, Process ID: ${process.pid}`,
    });
  });

  app.listen(3000, () => {
    console.log("Server is listening on Port 3000");
  });
}
