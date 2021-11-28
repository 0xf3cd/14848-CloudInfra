#!/bin/bash

sudo service ssh start

if [ ! -d "/tmp/hadoop-hduser/dfs/name" ]; then
        $HADOOP_HOME/bin/hdfs namenode -format
fi

$HADOOP_HOME/sbin/start-dfs.sh
$HADOOP_HOME/sbin/start-yarn.sh

sudo /etc/init.d/ssh start
python3 /src/hadoop.py
