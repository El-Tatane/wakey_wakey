FROM algebr/openface:latest

COPY ./src/sleep.py /tmp/sleep.py
COPY requirements.txt /tmp/requirements.txt

RUN apt-get -y update && \
    apt-get install -y python3-pip python3-openssl

#RUN python3 -m pip install --upgrade pip && \
#    python3 -m pip install --no-cache-dir -r /tmp/requirements.txt

#COPY requirements.txt /tmp/requirements.txt
RUN alias FaceLandmarkImg='/home/openface-build/build/bin/FaceLandmarkImg'


# install pip, requirements
ENTRYPOINT ["python", "/tmp/sleep.py"]



## Pull base image.
#FROM ubuntu:18.04
#
#COPY ./ /mon_repo/
#
##RUN /mon_repo/utils/install_open_face.sh
## Install.
#RUN \
#  apt-get -y update && \
#  apt-get -y upgrade && \
#  apt-get install -y python3-pip python3-dev locales
#
#
#
#RUN python3 -m pip install --upgrade pip && \
#    python3 -m pip install --no-cache-dir -r /mon_repo/requirements.txt
#
## encoding
#RUN locale-gen en_US.UTF-8
#ENV LANG en_US.UTF-8
#ENV LANGUAGE en_US:en
#ENV LC_ALL en_US.UTF-8
#
#WORKDIR /app
#
######### USEFUL DEV #####
#RUN apt-get update && apt-get install -y openssh-server
##COPY ignore/dev_var_env_to_load.env /root/.ssh/environment
#RUN mkdir /var/run/sshd
#RUN echo 'root:azerty' | chpasswd
#RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
##RUN sed -i 's/#PermitUserEnvironment no/PermitUserEnvironment yes/' /etc/ssh/sshd_config
#
## SSH login fix. Otherwise user is kicked off after login
#RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
#
#ENV NOTVISIBLE "in users profile"
#RUN echo "export VISIBLE=now" >> /etc/profile
#
######### END USEFUL DEV #####
#
#WORKDIR /app
#
#CMD ["/usr/sbin/sshd", "-D"]
#
## Define default command.
##ENTRYPOINT [ "bash", "/app/utils/start_server.sh" ]
#
## install apt-get install lsb-release