FROM  docker-registry.booking.com/jenkins-built/centos-7:latest

MAINTAINER Veniamin Kleshchenkov <veniamin.kleshchenkov@booking.com>

#RUN yum install -y nginx
#ADD ./nginx.conf /etc/nginx.conf
#ADD ./html /usr/share/nginx

#ENV HTTP_PROXY="http://webproxy:3128/"  \
#    HTTPS_PROXY="http://webproxy:3128/" \
#    http_proxy="http://webproxy:3128/"  \
#    https_proxy="http://webproxy:3128/"

RUN touch /var/log/sandbox.log

COPY .npmrc $WORKDIR

RUN yum install -y nodejs
RUN npm install -g yarn

# ENV PORT=3001
ENV WORKDIR=/usr/src/sandbox
RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY package.json $WORKDIR
RUN yarn install

EXPOSE 80
# EXPOSE 3001

ADD . $WORKDIR

# CMD ["/usr/bin/tail", "-f", "/var/log/messages"]
# CMD ["/usr/sbin/nginx", "-c", "/etc/nginx.conf"]
CMD ./bootstrap.sh
