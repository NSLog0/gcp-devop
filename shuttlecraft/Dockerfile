FROM node:12 as builder 

RUN apt-get update && apt-get install -y \
    bash \
    git \
    openssh-server \
    python \
    build-essential
     
WORKDIR /app
ADD package.json .
ADD yarn.lock . 
RUN yarn install
ADD . . 
RUN yarn build

CMD ["yarn", "start"]
