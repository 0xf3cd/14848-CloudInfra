FROM sonarqube:latest

# Install python3 and the required libraries.
RUN apk update && apk add bash
RUN apk add python3
RUN apk add make
RUN apk add gcc
RUN apk add rust
RUN apk add python3-dev
RUN apk add musl-dev
RUN apk add libffi-dev
RUN python3 -m ensurepip
RUN python3 -m pip install --upgrade pip

COPY requirements.txt ./
RUN python3 -m pip install -r ./requirements.txt

# Install the sonar-scanner.
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.0.0.1744.zip
RUN unzip sonar-scanner-cli-4.0.0.1744.zip
RUN mv sonar-scanner-4.0.0.1744 sonar-scanner
ENV PATH "$PATH:/opt/sonarqube/sonar-scanner/bin"

# Change password for root
RUN echo "root:root" | chpasswd

# Add ssh.
RUN apk add openssh-client
RUN apk add openssh-server
RUN apk add openrc
RUN openrc
RUN touch /run/openrc/softlevel
RUN mv /etc/ssh/sshd_config /etc/ssh/sshd_config_backup
COPY sshd_config /etc/ssh/sshd_config
RUN chmod a-x /etc/ssh/sshd_config
RUN /etc/init.d/sshd start
RUN /etc/init.d/sshd stop

# Copy the src codes.
COPY sonar.py ./
ENV PARAMIKO_USER "root"
ENV PARAMIKO_PASSWORD "root"
ENV PARAMIKO_WS_PORT "60004"
EXPOSE 60004
CMD ["python3", "./sonar.py"]
