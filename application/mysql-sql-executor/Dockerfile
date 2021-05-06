FROM mysql:5.7

WORKDIR /tmp

COPY ./init.sql ./init.sql

ENV MYSQL_HOST null

CMD ["bash", "-c", "mysql -u root -h $MYSQL_HOST --port=3306 --password= < ./init.sql"]