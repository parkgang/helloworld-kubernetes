# helloworld-kubernetes

kubernetes와 관련된 리소스를 포함하고 있습니다.

# Test DockerImage

ingress router를 테스트 할 떄 사용된 image입니다. <br />
`test-docker` 디렉터리에서 build 후 사용하도록 합니다. <br />

> ingress 실습 때 해당 image가 필요합니다!

```shell
docker build -t node-router-test:v0.1.0 .

docker run -d -p 5000:6060 node-router-test:v0.1.0
```

# 교안과 `guide` 디렉터리와 다른점

- ingress
  - docker for desktop cluster 환경 (localhost) 에서 실행할 수 있도록 수정
- local-volume
  - ReplicaSet에서 테스트를 위해 `test-` 시리즈 파일이 추가되었습니다.
  - `test-hostpath.yml` 은 hostPath에 맞게 작성되지 않은 거 같습니다. 추가적으로 공부 후 수정하도록 합니다.

# Azure AKS

azure kubernetes service 입니다. <br />
`.yaml` 중 IP, Email 등 부분을 수정해서 apply 해야하는 부분이 있습니다. <br />
해당 부분을 공식문서를 통해 확인하고 주의하여 apply 하도록 합니다. <br />
