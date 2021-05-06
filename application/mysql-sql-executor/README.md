# mysql-sql-executor

k8s의 DB를 외부에서 접속이 불가능한 경우 내부망 IP 주소를 사용해 원하는 Mysql 쿼리를 실행할 수 있는 Mysql 컨테이너 입니다.

# 메커니즘

1. DB에서 실행을 원하는 SQL 쿼리를 작성합니다.
2. 1번에서 작성한 sql 파일을 Dockerfile 파일을 사용해 Docker image 내부의 특정 위치로 이동합니다.
3. Dockerfile 내 SQL을 실행할 웹 서버의 IP, Port, DB 등의 정보 기입합니다.
4. Docker image 사용해 컨테이너 실행 시 설정한 DB에 설정한 SQL 실행 후 컨테이너를 삭제합니다.

# 실행

```shell
# build
docker build -t ghcr.io/parkgang/helloworld-kubernetes/application/mysql-sql-executor .

# push (k8s이므로 image가 Container Registry에 올라가야 합니다)
docker push ghcr.io/parkgang/helloworld-kubernetes/application/mysql-sql-executor

# k8s 실행 (mysql host 주소는 환경에 맞게 변경하여 사용합니다)
kubectl run sql-executor --image ghcr.io/parkgang/helloworld-kubernetes/application/mysql-sql-executor:latest --env="MYSQL_HOST=mysql-0.mysql"
```

# 이외

아래의 명령어로 실행결과를 확인하실 수 있습니다.

```shell
kubectl run mysql-client --image=mysql:5.7 -it --rm --restart=Never -- /bin/bash

# host는 환경에 맞게 변경합니다.
mysql -h mysql-0.mysql -p
```
