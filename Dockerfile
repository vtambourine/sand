FROM  docker-registry.booking.com/jenkins-built/centos-7:latest

MAINTAINER Veniamin Kleshchenkov <veniamin.kleshchenkov@booking.com>

EXPOSE 80

CMD ["/usr/bin/tail", "-f", "/var/log/messages"]
