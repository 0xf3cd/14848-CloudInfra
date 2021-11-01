# Course Project 1

> Ningqi Wang, ningqiw@andrew.cmu.edu



## Step 0. Introduction

I will use `React` to construct a web-based GUI.

Users are able to use `Jupyter Notebook` directly in the web browser.

For the rest of other applications, users access them via web-based terminals (powered by `React` and `Xterm.js`). There will be a Python program running in the docker image, which uses `Paramiko` and WebSocket to power the web-based terminals. The web-based terminals will connect to the Python program via WebSocket connections, and the Python program will take care of reading and forwarding users' requests.



## Step 1. Build Docker Images

* GUI (Web-based)
  * `cd gui/course-proj1`
  * `docier build . -t courseproj1-frontebd:latest`
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



## Step 2. Create YAML Files and Deploy to `minikube`

Start `minikube` on local machine:

```
cd yaml
minikube start --extra-config=apiserver.service-node-port-range=1-65535
```



### Step 2.1. Deploy the Frontend (Web-based GUI)

```
kubectl create -f ./frontend.yaml
minikube service courseproj1-frontend-nodeport --url
```

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/frontend-minikube-1.png?raw=true)

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/frontend-minikube-2.png?raw=true)



### Step 2.2. Deploy `Jupyter Notebook`

Note: In the docker file, it is specified that `Jupyter Notebook` should disable the token (password) by passing the argument `--NotebookApp.token=''` when starting `Jupyter Notebook`. However, this is unsafe, and should be improved in later implementation.

```
kubectl create -f ./jupyter.yaml
minikube service courseproj1-jupyter-nodeport --url
```

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/jupyter-minikube-1.png?raw=true)

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/jupyter-minikube-2.png?raw=true)



### Step 2.3. Deploy Other Applications

Since I have not yet implemented the Python program (described in Step 0), I am not able to finalize the YAML files for these applications. The files in `./yaml` for these applications use dummy ports now.

Also because of this, I am unable to deploy these applications to k8s, where the Python program is required. So I ran them in docker and got the following screenshots.

 

* `Spark`

```
docker run -it courseproj1-spark:latest /bin/bash
```

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/spark-docker.png?raw=true)



* `Hadoop`

```
docker run courseproj1-hadoop:latest
```

In the docker file, it is specified to execute a `.sh` file by `ENTRYPOINT ["/home/hduser/hadoop-3.3.0/etc/hadoop/docker-entrypoint.sh"]`.

The `docker-entrypoint.sh` will run my Python program:

```shell
#!/bin/bash

sudo service ssh start

if [ ! -d "/tmp/hadoop-hduser/dfs/name" ]; then
        $HADOOP_HOME/bin/hdfs namenode -format
fi

$HADOOP_HOME/sbin/start-dfs.sh
$HADOOP_HOME/sbin/start-yarn.sh

# bash
python3 /src/hadoop.py

```

In `hadoop.py`, there is a print statement:

```python
import paramiko
from websocket_server import WebsocketServer

print('To Be Implemented...')
```

So when running the docker image, the last line of the output will be "To Be Implemented...".

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/hadoop-docker.png?raw=true)



* `Sonar*`

```
docker run -it courseproj1-sonar:latest /bin/bash
```

![](https://github.com/0xf3cd/14848-CloudInfra/blob/main/CourseProj1/ckpt_screenshots/sonar-docker.png?raw=true)



## Reference

[1] https://github.com/rancavil/hadoop-single-node-cluster

[2] https://stackoverflow.com/questions/40767164/expose-port-in-minikube