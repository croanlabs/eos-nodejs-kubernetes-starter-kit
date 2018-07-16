const Eos = require('eosjs');
const { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc');

/**
 * Generate key pair.
 *
 */
function generateKeys() {
  return new Promise((resolve, reject) => {
    PrivateKey.randomKey().then(privateKey => {
      let result = {};
      result.privateWif = privateKey.toWif();
      result.publicKey = PrivateKey.fromString(result.privateWif).toPublic().toString();
      resolve(result);
    }).catch((err) => reject(err));
  });
}

/**
 * Configure EOS so API calls can be executed.
 *
 */
function confEos(keyprovider, chainId) {
  // Environment variables are automatically available to discover each
  // service that was created before this pod (nodejs pod) was
  // instantiated.
  const eosHost = process.env.EOS_MASTER_SERVICE_HOST;
  const eosPort = process.env.EOS_MASTER_SERVICE_PORT;

  const config = {
    chainId: chainId,
    keyProvider: keyprovider,
    httpEndpoint: `http://${eosHost}:${eosPort}`,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true
  }
  return Eos(config);
}

/**
 * Create an EOS account.
 *
 */
function createAccount(eos, accountName, pubkey) {
   eos.newaccount({
      creator: 'eosio',
      name: accountName,
      owner: pubkey,
      active: pubkey,
   });
}

/**
 * Perform example tasks on the blockchain.
 *
 */
async function getInfoBlockchain(eos, accountName) {
  // Get block No. 1
  await eos.getBlock(1, (error, result) => {
    console.log('Block 1 Info\n------------\n', result);
  });

  // Get blockchain general info
  await eos.getInfo((error, result) => {
    console.log('Blockchain Info\n--------------\n', result);
  });
}

async function run() {
  // Default keys for the eosio account and default chain id on the
  // eos-dev container.
  const pubk = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
  const privk = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
  const chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";

  // Info of the new account to be created.
  const accountName = 'conclubs';
  const keys = await generateKeys();

  let eos = confEos(privk, chainId);
  await createAccount(eos, accountName, keys.publicKey);
  await getInfoBlockchain(eos, accountName);
}

run();
