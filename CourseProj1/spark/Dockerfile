# FROM datamechanics/spark:3.1.1-hadoop-3.2.0-java-8-scala-2.12-python-3.8-latest
FROM debian:stable

# Install OpenJDK 8
RUN echo "deb http://deb.debian.org/debian/ sid main" >> /etc/apt/sources.list
RUN apt update
RUN apt install -y python3
RUN apt install -y python3-pip
RUN apt install -y wget
RUN apt install -y sudo
RUN apt install -y openjdk-8-jdk
RUN apt install -y openssh-server

# Install PySpark and Numpy
RUN python3 -m pip install numpy
RUN python3 -m pip install pyspark

# Change password for root
RUN echo "root:root" | chpasswd

# Configure sshd
RUN rm /etc/ssh/sshd_config
COPY sshd_config /etc/ssh/sshd_config
RUN /etc/init.d/ssh start

COPY requirements.txt ./
COPY spark.py ./
RUN pip install --no-cache-dir -r requirements.txt

ENV PARAMIKO_USER "root"
ENV PARAMIKO_PASSWORD "root"
ENV PARAMIKO_WS_PORT "60002"
EXPOSE 60002
CMD ["python3", "./spark.py"]
