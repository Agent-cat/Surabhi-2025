import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import './loadEnv.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Setting up ${numCPUs} workers...`);

  // Fork workers based on CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Replace the dead worker
  });

  // Log when a worker comes online
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  // Monitor cluster health
  setInterval(() => {
    const workers = Object.values(cluster.workers);
    console.log(`Active workers: ${workers.length}`);
  }, 30000);

} else {
  // Worker process - import and run the main application
  import('./index.js');
}
