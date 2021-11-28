kubectl apply -f hadoop-deployment.yaml
kubectl apply -f hadoop-service.yaml
kubectl apply -f spark-deployment.yaml
kubectl apply -f spark-service.yaml
kubectl apply -f jupyter-deployment.yaml
kubectl apply -f jupyter-service.yaml
kubectl apply -f sonar-deployment.yaml
kubectl apply -f sonar-service.yaml

# kubectl apply -f frontend-deployment.yaml
# kubectl apply -f frontend-service.yaml
