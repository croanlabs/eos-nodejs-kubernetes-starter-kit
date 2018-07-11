const eosLib = require('eosjs')

/* Environment variables for service discovery.
 *
 * Environment variables are automatically available to discover each
 * service that was created before this pod (nodejs pod) was instantiated.
 *
 * To know where the eos-master service (see eos.yaml) is running
 * these are the two env. vars. that will be used:
 *   - EOS_MASTER_SERVICE_HOST: IP address where the service is running.
 *   - EOS_MASTER_SERVICE_PORT: port of the service.
 *
 * Check the Kubernetes service documentation to see what other
 * env vars are available.
 */
const eosHost = process.env.EOS_MASTER_SERVICE_HOST;
const eosPort = process.env.EOS_MASTER_SERVICE_PORT;

config = {
  chainId: null,
  keyProvider: null,
  httpEndpoint: `http://${eosHost}:${eosPort}`,
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  sign: false
}

eos = eosLib(config);

// Get block No. 1
eos.getBlock(1, (error, result) => {
  console.log(result);
});

// Get blockchain general info
eos.getInfo((error, result) => {
  console.log(error, result);
});
