const Eos = require('eosjs');
const { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc');

/**
 * Generate keystore to manage keys used to interact with the EOS
 * blockchain.
 *
 */
function generateKeys() {
  return new Promise((resolve, reject) => {
    PrivateKey.randomKey().then(privateKey => {
      let result = {};
      result.privateWif = privateKey.toWif();
      result.privateKey = privateKey;
      result.publicKey = PrivateKey.fromString(result.privateWif).toPublic().toString();
      resolve(result);
    }).catch((err) => reject(err));
  });
}

/**
 * Configure EOS so that API calls can be executed.
 *
 */
function confEos(keyprovider) {
  // Environment variables are automatically available to discover each
  // service that was created before this pod (nodejs pod) was
  // instantiated.
  const eosHost = process.env.EOS_MASTER_SERVICE_HOST;
  const eosPort = process.env.EOS_MASTER_SERVICE_PORT;

  const config = {
    chainId: null,
    keyProvider: keyprovider,
    httpEndpoint: `http://${eosHost}:${eosPort}`,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: false
  }
  return Eos(config);
}

/**
 * Create an EOS account.
 *
 */
function createEosAccount(eos, accountName, pubkey) {
   eos.transaction(tr => {
    tr.newaccount({
      creator: 'eosio',
      name: accountName,
      owner: pubkey,
      active: pubkey,
    });

    tr.buyrambytes({
      payer: 'eosio',
      receiver: accountName,
      bytes: 8192,
    });

    tr.delegatebw({
      from: 'eosio',
      receiver: accountName,
      stake_net_quantity: '10.0000 SYS',
      stake_cpu_quantity: '10.0000 SYS',
      transfer: 0,
    });
  });
}

/**
 * Perform example tasks on the blockchain.
 *
 */
async function testBlockchain(accountName) {
  // Get block No. 1
  eos.getBlock(1, (error, result) => {
    console.log(result);
  });

  // Get blockchain general info
  eos.getInfo((error, result) => {
    console.log(error, result);
  });

  // Create new account
  eos.transaction(tr => {
    tr.newaccount({
      creator: 'eosio',
      name: accountName,
      owner: pubkey,
      active: pubkey
    })

    tr.buyrambytes({
      payer: 'eosio',
      receiver: accountName,
      bytes: 8192
    })

    tr.delegatebw({
      from: 'eosio',
      receiver: accountName,
      stake_net_quantity: '10.0000 SYS',
      stake_cpu_quantity: '10.0000 SYS',
      transfer: 0
    })
  })
}

async function run() {
  const accountName = 'consensuscl';
  const keys = await generateKeys();
  const eos = confEos([keys.privateWif]);
  createEosAccount(eos, accountName, keys.publicKey);
}

run();
