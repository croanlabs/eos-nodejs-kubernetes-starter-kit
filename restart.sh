docker build --no-cache -t consensusclubs/node-eos-example:v1.0.0 app/
kubectl delete service nodejs-master
kubectl delete deployment nodejs-deployment
kubectl delete service eos-master
kubectl delete deployment eos-deployment
kubectl create -f eos.yaml
kubectl create -f node.yaml
