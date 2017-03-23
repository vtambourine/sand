FROM  docker-registry.booking.com/jenkins-built/centos-7:latest

MAINTAINER Veniamin Kleshchenkov <veniamin.kleshchenkov@booking.com>

EXPOSE 80

RUN yum install -y nginx
ADD ./nginx.conf /etc/nginx.conf
ADD ./html /usr/share/nginx

ENV http_proxy=http://webproxy:3128/
ENV https_proxy=$http_proxy

# RUN curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -
RUN yum install -y nodejs
# RUN curl -s https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
# RUN yum install -y yarn

RUN npm intstall -g yarn

ENV PORT=3001
ENV WORKDIR=/usr/src/sandbox
RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY package.json $WORKDIR
RUN yarn install

EXPOSE 3001

COPY . $WORKDIR

# CMD ["/usr/bin/tail", "-f", "/var/log/messages"]
# CMD ["/usr/sbin/nginx", "-c", "/etc/nginx.conf"]
CMD ./bootstrap.sh
