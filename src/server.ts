import { Server } from 'http';

import { envConfig } from './app/config';
import mongoose from 'mongoose';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';
import { serverApp } from './app';

let server: Server;
async function main() {
  try {
    await mongoose.connect(envConfig.MONGO_URL as string);

    server = serverApp.listen(envConfig.PORT, () => {
      console.log(`Example app listening on port ${envConfig.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

process.on('SIGTERM', () => {
  console.log('SIGTERM signal recieved... Server shutting down..');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal recieved... Server shutting down..');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejecttion detected... Server shutting down..', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception detected... Server shutting down..', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

seedSuperAdmin();
main();
