# helloworld-kubernetes

kubernetes를 연습해보자!

# Test DockerImage

ingress router를 테스트 할 떄 사용된 image입니다.

```shell
docker build -t node-router-test:v0.1.0 .

docker run -d -p 5000:11230 node-router-test:v0.1.0
```
