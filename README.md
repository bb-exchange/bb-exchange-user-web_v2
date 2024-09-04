# 📕 비법거래소 Front-End

![비법거래소배너](https://github.com/user-attachments/assets/b4a9af4c-ba0b-44b1-a9a0-773e7e3d47a3)


- 비법거래소 웹 바로가기 : https://bibeop.com/serviceIntroduction

## 프로젝트 소개

- 비법거래소는 글로 돈 버는 초간단 부수입 앱테크 입니다.
- 누구한테도 말하기 아까운 나의 소중한 경험과 지식, <strong>비법거래소에서 판매하세요!</strong>
- 사용자들에게 좋아요 100개를 받으면 100포인트로 상장되어 수익창출이 시작 됩니다!
- 글을 읽은 사용자들에게 더 많은 좋아요를 받을수록 내 글은 점점 더 높은 가격에 거래 됩니다.

<br>

## 1. 개발 환경
- 기술스택 : ```Next.js14``` ```React``` ```Typescript``` ```TanStack-Query``` ```Scss```
- 분석툴 : ```GA``` ```GTM``` ```Amplitude```
- 버전 및 이슈관리 : ```Github``` ```Jira```
- 협업 툴 : ```Slack``` ```Gather```
<br>

## 2. 채택한 개발 기술

### React, Next.js, Typescript

- React
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- Next.js
  - SSR을 통해 서비스 안정성 및 사용자 경험을 증가시켰습니다.
  - 비법글 검색엔진 노출을 최대화 하기위해 검색엔진최적화(SEO)를 하였습니다. 
- Typescript
  - ....
    
### Zustand
- ....
- ....


### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- airbnb의 코딩 컨벤션을 참고해 사용했고, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

<br>

## 3. 프로젝트 폴더 구조

```
├── README.md
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
├── public
│    └── index.html
└── src
     ├── api
     │     └── mandarinAPI.js
     ├── assets
     │     ├── fonts
     ├── atoms
     │     ├── LoginData.js
     ├── common
     │     ├── alert
     │     │     ├── Alert.jsx
     │     ├── button
     │     └── userBanner
     ├── pages
     │     ├── addProduct
     │     └── splash
     ├── routes
     │     ├── privateRoutes.jsx
     └── styles
           └── Globalstyled.jsx
```

<br>

## 3. 컨벤션
### Branch 전략
* main : 라이브 서버에 제품으로 출시되는 브랜치 
* develop : 다음 출시버전을 개발하는 브랜치
* feat : 새로운 기능을 개발하는 브랜치
* hotfix : master 브랜치에서 발생한 버그를 수정하는 브랜치

  
### Commit Type
* feat : 새로운 기능에 대한 타입
* fix : 버그 수정과 관련된 타입
* build : 빌드관련 타입
* chore : 분류하기 어려운 자잘한 수정에 대한 타입
* docs : Documentation 수정에 대한 타입
* style : 코드 의미에 영향을 주지 않는 변경사항 타입 (공백, 포맷팅)
* refactor : 코드 리팩토링에 대한 타입

## 4. 프로젝트 세팅
```
git clone https://github.com/bb-exchange/bb-exchange-user-web_v2.git
yarn install
```
### vscode 사용시
[링크](https://yarnpkg.com/getting-started/editor-sdks#vscode) 참고 후 아래 절차 진행
1. Press ctrl+shift+p in a TypeScript file
2. Choose "Select TypeScript Version"
3. Pick "Use Workspace Version"
4. 라이브러리 내부 확인하시려면 [ZipFS](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) 익스텐션 다운 받으셔야 합니다!!




## 5. 코드작성 참고사항


