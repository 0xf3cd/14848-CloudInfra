# Reference: https://github.com/rancavil/hadoop-single-node-cluster/blob/master/Dockerfile
FROM debian:stable

# Install required libraries.
RUN echo "deb http://deb.debian.org/debian/ sid main" >> /etc/apt/sources.list
RUN apt update
RUN apt install -y python3
RUN apt install -y python3-pip
RUN apt install -y wget
RUN apt install -y sudo
RUN apt install -y openjdk-8-jdk
RUN apt install -y openssh-server
RUN apt install -y vim

# Change password for root
RUN echo "root:root" | chpasswd

# Configure sshd
RUN rm /etc/ssh/sshd_config
COPY sshd_config /etc/ssh/sshd_config
RUN /etc/init.d/ssh start

RUN useradd -m hduser && echo "hduser:supergroup" | chpasswd && adduser hduser sudo && echo "hduser     ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && cd /usr/bin/ && sudo ln -s python3 python

# Install python3 and libraries.
COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY src /src
COPY ssh_config /etc/ssh/ssh_config

WORKDIR /home/hduser

# Install hadoop
USER hduser
RUN wget -q https://downloads.apache.org/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz && tar zxvf hadoop-3.3.0.tar.gz && rm hadoop-3.3.0.tar.gz
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa && cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys && chmod 0600 ~/.ssh/authorized_keys

ENV HDFS_NAMENODE_USER hduser
ENV HDFS_DATANODE_USER hduser
ENV HDFS_SECONDARYNAMENODE_USER hduser

ENV YARN_RESOURCEMANAGER_USER hduser
ENV YARN_NODEMANAGER_USER hduser

ENV HADOOP_HOME /home/hduser/hadoop-3.3.0
RUN echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh

COPY core-site.xml $HADOOP_HOME/etc/hadoop/
COPY hdfs-site.xml $HADOOP_HOME/etc/hadoop/
COPY yarn-site.xml $HADOOP_HOME/etc/hadoop/
COPY docker-entrypoint.sh $HADOOP_HOME/etc/hadoop/
ENV PATH $PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

# TODO: EXPOSE more ports if needed.
EXPOSE 50070 50075 50010 50020 50090 8020 9000 9864 9870 10020 19888 8088 8030 8031 8032 8033 8040 8042 22
ENV PARAMIKO_USER "root"
ENV PARAMIKO_PASSWORD "root"
ENV PARAMIKO_WS_PORT "60001"
EXPOSE 60001
ENTRYPOINT ["/home/hduser/hadoop-3.3.0/etc/hadoop/docker-entrypoint.sh"]
