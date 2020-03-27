# Pull base image.
FROM ubuntu:18.04

# Install.
RUN \
  apt-get -y update && \
  apt-get -y upgrade && \
  apt-get install -y python3-pip python3-dev locales

COPY requirements.txt /tmp/

RUN python3 -m pip install --upgrade pip && \
    python3 -m pip install --no-cache-dir -r /tmp/requirements.txt

# encoding
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

WORKDIR /app

# Define default command.
ENTRYPOINT [ "bash", "/app/utils/start_server.sh" ]
