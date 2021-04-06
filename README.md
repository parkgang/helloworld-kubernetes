# helloworld-kubernetes

kubernetes와 관련된 리소스를 포함하고 있습니다. <br />
각 디렉터리의 사용법 및 이슈가 정리되어 있습니다. <br />

# guide

## Test DockerImage

ingress router를 테스트 할 떄 사용된 image입니다. <br />
`test-docker` 디렉터리에서 build 후 사용하도록 합니다. <br />

> ingress 실습 때 해당 image가 필요합니다!

```shell
docker build -t node-router-test:v0.1.0 .

docker run -d -p 5000:6060 node-router-test:v0.1.0
```

## 교안과 guide 디렉터리와 다른점

- ingress
  - docker for desktop cluster 환경 (localhost) 에서 실행할 수 있도록 수정
- local-volume
  - ReplicaSet에서 테스트를 위해 `test-` 시리즈 파일이 추가되었습니다.
  - `test-hostpath.yml` 은 hostPath에 맞게 작성되지 않은 거 같습니다. 추가적으로 공부 후 수정하도록 합니다.

# azure-aks

azure kubernetes service 입니다. <br />
`.yaml` 중 IP, Email 등 부분을 수정해서 apply 해야하는 부분이 있습니다. <br />
해당 부분을 공식문서를 통해 확인하고 주의하여 apply 하도록 합니다. <br />

아래에 header로 기입되지 않은 시리지는 중요도가 낮거나 트러블 슈팅이 어렵지 않기 때문에 작성되지 않았습니다. <br />
변경해야하는 값들은 공식문서를 확인하세요. <br />

## https-ingress-controller

1. cluster-issuer.yaml
   - spec.acme.email 필히 입력합니다.
   - k8s `clusterissuer/letsencrypt` object에서 이메일이 유효하지 않아 문제가 발생합니다.
1. hello-world-ingress.yaml
   - `MY_CUSTOM_DOMAIN`을 AKS ingress와 리졸빙된 DNS의 도메인 주소로 변경합니다.

## azure-files-dynamic-pv

1. azure-file-sc.yaml
   1. 퍼시스턴트 볼륨 클레임을 동적으로 확장할 수 있도록 [aks 공식문서](https://docs.microsoft.com/ko-kr/azure/aks/azure-files-dynamic-pv#create-a-storage-class)의 `.yaml` 중 `allowVolumeExpansion: true`를 추가하였습니다.
      > [k8s PVC 볼륨 클레임 확장 레퍼런스](https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/#%ED%8D%BC%EC%8B%9C%EC%8A%A4%ED%84%B4%ED%8A%B8-%EB%B3%BC%EB%A5%A8-%ED%81%B4%EB%A0%88%EC%9E%84-%ED%99%95%EC%9E%A5)
   1. replicas 시나리오를 쉽게 테스트 하도록 `azure-pvc-files-deployment.yaml` 파일을 추가하였습니다.

# helm

[helm 공식 문서](https://helm.sh/ko/docs/intro/using_helm/#%EC%84%A4%EC%B9%98-%EC%A0%84-%EC%B0%A8%ED%8A%B8-%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95)에서 chart의 구성 옵션을 변경하기 위해 사용된 파일이 있습니다.

# application

여러 애플리케이션 배포 방법을 정리해놓아 필요할 때 쓸 수 있도록 정리해 놓는 디렉터리입니다.

## mysql-deployment

[해당 문서](https://kubernetes.io/ko/docs/tasks/run-application/run-single-instance-stateful-application/)를 참고하여 작성되었습니다. <br />
추가적으로 아래의 내용이 커스텀 되어있습니다.

1. PV의 경우 Azure Files를 사용하도록
1. LoadBalancer를 등록하여 외부에서 접근하도록

## mysql-replicated-stateful

[해당 글](https://ikcoo.tistory.com/m/126)의 `MySQL StatefulSet 이중화 구성`과 [공식 문서](https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/)을 참고하여 작성되었습니다. <br />
기준 점은 공식문서 입니다. <br />

공식 문서와 블로그 글이 다른 점은 아래와 같습니다.

1. `primary`를 `master`로 `replica`를 `slave`로 이름 변경
1. spec.volumeClaimTemplates.spec.accessModes의 값을 `ReadWriteMany` -> `ReadWriteOnce` 으로 변경

추가적으로 제가 변경한 부분은 아래와 같습니다.

1. Azure Files 동적 Volume 사용
   1. `mysql-sc.yaml` 파일이 추가되어 있습니다.
      1. StatefulSet에서 오류가 발생하여 `volumeBindingMode: WaitForFirstConsumer`가 추가되어 있습니다.
   1. 이과정에서 자연스럽게 `volumeMounts.name`이 변경되었습니다.
2. 주석 한글화
