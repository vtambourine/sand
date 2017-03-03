FROM  docker-registry.booking.com/jenkins-built/centos-7:latest

MAINTAINER Veniamin Kleshchenkov <veniamin.kleshchenkov@booking.com>

EXPOSE 80

RUN yum install -y nginx
ADD ./nginx.conf /etc/nginx.conf
ADD ./html /usr/share/nginx

# CMD ["/usr/bin/tail", "-f", "/var/log/messages"]
CMD ["/usr/sbin/nginx", "-c", "/etc/nginx.conf"]
