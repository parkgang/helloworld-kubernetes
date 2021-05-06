FROM mysql:5.7

WORKDIR /tmp

COPY ./init.sql ./init.sql

ENV MYSQL_HOST null

# password는 사용되지 않아서 빈 값으로 놓았습니다. (아에 없어도 상관 없으나 추후, 사용하기 쉽도록 남겨놓았습니다)
CMD ["bash", "-c", "mysql -u root -h $MYSQL_HOST --port=3306 --password= < ./init.sql"]