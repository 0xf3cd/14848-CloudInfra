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

# Copy the src codes.
COPY sonar.py ./
# TODO: EXPOSE some ports here.
CMD ["python3", "./sonar.py"]
