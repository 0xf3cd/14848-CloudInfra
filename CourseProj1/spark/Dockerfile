FROM datamechanics/spark:3.1.1-hadoop-3.2.0-java-8-scala-2.12-python-3.8-latest
COPY requirements.txt ./
COPY spark.py ./
RUN pip install --no-cache-dir -r requirements.txt
# TODO: EXPOSE some ports here.
CMD ["python", "./spark.py"]
