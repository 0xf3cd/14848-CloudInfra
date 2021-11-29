# Course Project 1

> Ningqi Wang, ningqiw@andrew.cmu.edu



## 0x0. Introduction

I will use `React` to construct a web-based GUI.

Users are able to use `Jupyter Notebook` directly in the web browser.

For the rest of other applications, users access them via web-based terminals (powered by `React` and `Xterm.js`). There will be a Python program running in the docker image, which uses `Paramiko` and WebSocket to power the web-based terminals. The web-based terminals will connect to the Python program via WebSocket connections, and the Python program will take care of reading and forwarding users' requests.



The docker images used:

* GUI (Web-based)
  * `cd gui/course-proj1`
  * `docker build . -t courseproj1-frontend:latest`
  * https://hub.docker.com/repository/docker/nqmaigre/courseproj1-frontend
* Spark
  * `cd spark`
  * `docker build . -t courseproj1-spark:latest`
  * https://hub.docker.com/repository/docker/nqmaigre/courseproj1-spark
* Hadoop
  * `cd hadoop`
  * `docker build . -t courseproj1-hadoop:latest`
  * https://hub.docker.com/repository/docker/nqmaigre/courseproj1-hadoop
* SonarQube and SonarScanner
  * `cd sonar`
  * `docker build . -t courseproj1-sonar:latest`
  * https://hub.docker.com/repository/docker/nqmaigre/courseproj1-sonar
* Jupyter Notebook
  * `cd jupyter_notebook`
  * `docker build . -t courseproj1-jupyter:latest`
  * https://hub.docker.com/repository/docker/nqmaigre/courseproj1-jupyter



## 0x1. Deploy to GCP Kubernetes Engine (GKE)

1. Follow instructions from `https://github.com/mohamedfarag/14-848-extra-credit-project`, complete step 1 to step 10. After these steps, a cluster will be created, and the cloud shell terminal will be connected to the cluster.

   ![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/deployment_screenshots/1.png?raw=true)

2. Clone the git repo `git clone https://github.com/0xf3cd/14848-CloudInfra`, and do `cd 14848-CloudInfra/CourseProj1/yaml/`.

3. Make `deploy.sh` executable by `chmod +x deploy.sh`, and then do `./deploy.sh`. The shell script will deploy pods and services for Hadoop, Spark, Sonar*, and Jupyter Notebook.

4. Wait until the pods and services are fully deployed (all required external IPs appear). Monitor the status by `watch kubectl get svc`.

   ![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/deployment_screenshots/2.png?raw=true)

5. Update the source codes for the frontend. Do `cd ../gui/course-proj1/src/common`, and modify the file `url.ts`.

   ```typescript
   // TODO: Modify the URLs and re-build the docker image.
   const HADOOP_TERMINAL_WS_URL  = 'ws://34.73.189.19:80';
   const JUPYTER_URL             = 'http://35.231.191.76:80';
   const SONAR_TERMINAL_WS_URL   = 'ws://35.229.61.230:80';
   const SPARK_TERMINAL_WS_URL   = 'ws://34.139.70.23:80';
   
   export {
     JUPYTER_URL,
     HADOOP_TERMINAL_WS_URL,
     SPARK_TERMINAL_WS_URL,
     SONAR_TERMINAL_WS_URL,
   };
   
   ```

6. Re-build the docker image for frontend on **local machine**. Enter `14848-CloudInfra/CourseProj1/gui/course-proj1`, and then `docker build . -t courseproj1-frontend:latest`. Push the image to docker hub by `docker tag courseproj1-frontend:latest nqmaigre/courseproj1-frontend:latest ` and `docker push nqmaigre/courseproj1-frontend:latest`. 

   ![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/deployment_screenshots/3.png?raw=true)

7. Back to GCP cloud shell terminal. Locate to directory `14848-CloudInfra/CourseProj1/yaml`. Deploy the pods and service for frontend by `kubectl apply -f frontend-deployment.yaml` and `kubectl apply -f frontend-service.yaml`. Wait until the deployment finishes.

   ![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/deployment_screenshots/4.png?raw=true)

8. Get the external IP to the frontend service and visit it.

   ![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/deployment_screenshots/5.png?raw=true)



## 0x2. Reference

[1] https://github.com/rancavil/hadoop-single-node-cluster

[2] https://stackoverflow.com/questions/40767164/expose-port-in-minikube

[3] https://github.com/mohamedfarag/14-848-extra-credit-project