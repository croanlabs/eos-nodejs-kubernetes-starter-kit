docker build --no-cache -t consensusclubs/node-eos-example:v1.0.0 app/
kubectl create -f eos.yaml
kubectl create -f node.yaml
