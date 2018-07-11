# EOS blockchain + Node.js + Kubernetes starter kit
Starter kit project using EOS blockchain (local instance) + Node.js + Kubernetes (Minikube).

## Introduction
The aim of this project is to provide the simplest base configuration for a project using EOS blockchain, Node.js and Kubernetes. Take into consideration that a local instance of the EOS blockchain is set up, so your JS code will not be talking to the EOS network but to your local instance of the blockchain. The eosjs library is used to interact with the blockchain from the JS side.

## Dependencies
Install the following dependencies before running the project:
 - Docker
 - Minikube
 - Kubectl

Run the following command to allow Minikube to work with the Docker deamon:
```bash
eval $(minikube docker-env)
```

## Usage
### Running the project
Run the start script to execute the project:
```bash
./start.sh
```

### Clean restart
Run the restart script to delete the Kubernetes pods, services and deployments, re-build the nodejs-based Docker image to include your code and create the aforementioned Kubernetes entities again:
```bash
./restart.sh
```

### Clean
Run the clean script to delete all the Kubernetes entities created by this program:
```bash
./clean.sh
```

### Verify results
The status of the created Kubernetes entities (including logs) can be checked through the minikube dashboard: 
```bash
minikube dashboard
```
