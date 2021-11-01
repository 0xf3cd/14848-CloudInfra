FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y python3-pip
RUN python3 -m pip install jupyter

EXPOSE 8888
# TODO: Expose the password since --NotebookApp.token='' is unsafe.
CMD ["jupyter", "notebook", "--port=8888", "--no-browser", "--ip=0.0.0.0", "--allow-root", "--NotebookApp.token=''"]
