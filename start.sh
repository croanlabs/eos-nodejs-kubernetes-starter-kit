docker build --no-cache -t consensusclubs/node-eos-example:v1.0.0 app/
kubectl create -f eos.yaml
sleep 5
kubectl create -f node.yaml
