# Course Project 1

> Ningqi Wang, ningqiw@andrew.cmu.edu



Here are the steps to run the docker images on Kubernetes engine on local machine:



## Step 1. Build Docker Images

* Terminal
  * `cd terminal`
  * `docker build . -t courseproj1-terminal:latest`
* Spark
  * `cd spark`
  * `docker build . -t courseproj1-spark:latest`
* Hadoop
  * `cd hadoop`
  * `docker build . -t courseproj1-hadoop:latest`

* SonarQube and SonarScanner
  * `cd sonar`
  * `docker build . -t courseproj1-sonar:latest`
* Jupyter Notebook
  * `cd jupyter_notebook`
  * `docker build . -t courseproj1-jupyter:latest`



## Reference

[1] https://github.com/rancavil/hadoop-single-node-cluster