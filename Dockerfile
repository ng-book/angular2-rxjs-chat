#
# Angular2 RxJS Chat Dockerfile
#

# Pull base image.
FROM node:0.12.7-wheezy

# Install Node.js
RUN \
  cd /tmp && \
  echo "hi"

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["bash"]
