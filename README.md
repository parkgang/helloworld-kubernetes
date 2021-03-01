# helloworld-kubernetes

kubernetes를 연습해보자!

# Test DockerImage

ingress router를 테스트 할 떄 사용된 image입니다.
`test-docker` 디렉터리에서 build 후 사용하도록 합니다.

> ingress 실습 때 해당 image가 필요합니다!

```shell
docker build -t node-router-test:v0.1.0 .

docker run -d -p 5000:6060 node-router-test:v0.1.0
```

# 교안과 다른점

- ingress
  - docker for desktop cluster 환경 (localhost) 에서 실행할 수 있도록 수정
