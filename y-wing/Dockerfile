FROM ruby:2.7.1 as builder

RUN apt-get update && apt-get install -y \ 
      bash \
      openssh-server \
      curl \ 
      build-essential \
      git \
      apt-transport-https \ 
      lsb-release ca-certificates

RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
RUN apt-get update && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y \ 
      yarn

WORKDIR /app

ADD Gemfile .
ADD Gemfile.lock .
RUN bundle install
ADD . .

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
