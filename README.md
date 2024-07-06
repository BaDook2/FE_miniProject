# 🏨 FAST 숙박 / 예약 서비스

- [FAST Service](https://fe-mini-project-ten.vercel.app/)
- [GitHub 레포지토리](https://github.com/kdt8-mini-project-team5/FE_miniProject)

## 프로젝트 소개
- 숙박 예약이 가능한 플랫폼 FAST입니다.
- 프로젝트 기간: 2024.06.17 ~  2024.07.05

## 팀원 구성
|**장경빈**|**김민수**|**김여진**|
:---: | :---: | :---: | 
 <img width="180" alt="장경빈img" src="https://avatars.githubusercontent.com/u/97817208?v=4"> | <img width="180"  alt="김민수img" src="https://avatars.githubusercontent.com/u/153588816?v=4"> | <img width="180" alt="김여진img" src="https://avatars.githubusercontent.com/u/79198245?s=400&v=4"> |
| [BaDook2](https://github.com/BaDook2) | [SSUDNG](https://github.com/SSUDNG) | [Yeojin-Kim12](https://github.com/Yeojin-Kim12)|
| 팀장 | 팀원 | 팀원 |
| 로그인, 회원가입<br/>개별상품조회 | 결제하기<br/>주문결과확인<br/>주문내역확인 | 전체상품조회<br/>장바구니 |

## 사용 기술 스택
- Programming<br>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/swr-000000?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

- collaboration tool<br>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> <img alt="Notion" src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> <img alt="Slack" src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img alt="Linear" src="https://img.shields.io/badge/linear-5E6AD2?style=for-the-badge&logo=slack&logoColor=white"/>

- Design<br>
[<img alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>](https://www.figma.com/design/Q54rP5deHWDnmndclAex5L/miniproject?t=OlUgedB6VZ6jKgV4-0)

- deploy<br>
<img alt="Vercel" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>


## UserFlow
![UserFlow](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/74d8cd7b-e403-4f45-ac94-5c544dd47d59)

## 페이지 설명

## 로그인 · 회원가입 페이지
<img alt="login-img" src="https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/97817208/21c05f60-15d0-450e-bc3a-7d825f54c2b7" height="300">

- zod를 사용해서 이메일과 비밀번호에 대한 유효성 검사를 진행하고, 서버에 fetch하여 쿠키를 받는 방식으로 진행하였습니다.

<img alt="mail-img" src="https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/97817208/7cc0d427-255d-4893-85b6-e97ef259eedf" width="300">

- 회원가입 시 `이메일 인증`을 위한 메일이 전송됩니다.

<img alt="sign-up-img" src="https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/97817208/aaa4d47a-332a-4de4-9110-c5730513c364" height="300">

- zod를 사용해서 유효성 검사를 하고, 서버에 fetch하는 방식으로 진행했습니다.

### 메인 화면 (전체 상품 조회)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/1c5abd4d-fcd9-452a-b454-996433128a49)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/c445d87b-e6e5-4382-8ed4-e521807da94f)
- header에는 `메인페이지`, `예약내역`, `장바구니`, `로그인` or `로그아웃`을 표시합니다.
- 카테고리는 `호텔`, `펜션`, `모텔`, `민박`, `콘도미니엄`을 선택할 수 있습니다.
- 전체 상품 조회는 `React Query`의 무한 스크롤 기능을 이용하였으며 queryClient를 사용해 SessionStorage에 저장하여 뒤로가기로 돌아왔을 때 scroll의 위치를 기억해 보여줍니다.
- 최저가, 50000원, 80000원, 100000원이상으로 필터링을 할 수 있습니다.
- 사용자 편의성을 위한 상단 버튼이 있습니다.

## 개별 상품 조회 페이지
<img alt="image" src="https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/97817208/730511bc-bc59-496f-a72a-e1140d6b47e5" width="500" height="300">

- 개별 상품 조회를 할 때 `인원`, `체크인`, `체크아웃` 시간을 선택할 수 있으며, 인원에 따라 숙소가 필터링 됩니다.

<img width="500" alt="image" src="https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/97817208/0731894b-01d3-4476-a627-42b1759c54a8">

- 해당 페이지에서 상품을 바로 예약하거나 장바구니에 추가할 수 있습니다.

<img alt='cart-add-success' src='https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/8c523d69-6804-42c4-89b6-02390112d1ca/' width="300">

<img alt='cart-add-fail' src="https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/97817208/8c722cff-8a44-4bb8-a640-4a93cccad7a8" width="300">

- 오늘 날짜 이전의 상품이거나 장바구니에 있는 상품이라면 장바구니 추가 실패 문구를 보여줍니다.

### 장바구니
![image](https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/79198245/21c725ac-8c2d-4f7e-b6c8-8bccee9fffce)
- 상품의 체크박스를 개별 선택하거나 전체 선택을 이용해 상품을 `예약` or `삭제`할 수 있습니다.
- 만약 장바구니의 상품들의 날짜가 지나거나 이미 예약된 상품이라면 예약 불가 상품을 띄우고 예약할 수 없게 됩니다.

### 결제하기
![image](https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/79198245/fb5e508a-6c90-49ad-894b-81f5846a4202)
- 예약자의 정보를 입력하고 약관에 동의한 후 `결제하기`를 누르면 해당 상품들이 예약 됩니다.

### 주문 결과 확인
![image](https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/79198245/12043527-84c2-4d38-8043-5e735af20b11)
- 앞서 결제한 상품들의 `결과`를 확인할 수 있는 페이지입니다.

### 주문 내역 확인
![image](https://github.com/kdt8-mini-project-team5/FE_miniProject/assets/79198245/f3e25f21-2e30-4e3c-a75a-2911dc34088c)
- 지금까지 해당 이메일로 주문한 상품들의 `주문 내역`을 확인할 수 있는 페이지입니다.

## 라우팅
이번에 Secure Cookie를 썻기 때문에 JS에서 Cookie를 다루지 못했습니다. 그래서 서버의 login check API를 통해 login 여부를 확인하였고 로그인 상태에서 로그인 페이지와 회원가입 페이지를 제한해야했기 때문에 전역상태 관리로 login 여부를 관리하였습니다.

## 느낀점
#### 장경빈
- #### 자랑하고 싶은 부분
  - NextJS를 쓰다보니 client 컴포넌트와 server 컴포넌트에 대해 깊게 생각해보는 계기가 되었다.
  - zod를 이용한 유효성 검사가 익숙해졌다.
- #### 아쉬운 부분
  - 라우팅 부분의 코드가 난잡한데, 더 효율적으로 작성할 수 있는 방법이 있을지 궁금합니다.
  - 기능구현을 하느라 NextJS의 기술을 활용을 잘 하지 못해서 아쉽습니다.
- #### 프로젝트 관리 및 협업에 관한 내용
  - 기능을 구현하면서, 새로운 프레임웨크를 경험하다보니 코드리뷰를 진행할 기회가 거의 없었던 것 같습니다. 다음 프로젝트에서는 코드리뷰를 진행해보고 싶습니다.
  - 인원이 늘어나고, 다른 분야의 개발자분들과 협업을 진행해보니, 커뮤니케이션이 많이 중요하다는 것을 느꼈습니다.

#### 김여진
- #### 자랑하고 싶은 부분

  - 하나의 컴포넌트를 이용해 여러 페이지(장바구니, 예약하기, 예약내역)에서 사용해서 구현해보면서 컴포넌트의 재사용성을 높여봤습니다.
  - 무한스크롤을 React Query를 이용해서 구현했고 client를 이용해 뒤로가기 시 다시 보던 화면으로 돌아와 사용자의 편의성을 높여봤습니다.
  
- #### 아쉬운 부분
  - 메인 페이지의 필터링을 제일 마지막에 구현했는데 현재 페이지는 가격으로만 필터링을 했지만 실제 사용하는 예약 사이트처럼 인기순, 별점순, 최저가 등으로 했었으면 좋았을 것 같았습니다.
  - Next.js의 장점인 SSR을 사용하기 위해서 선택을 했지만 이번 프로젝트에서는 전 프로젝트와 동일한 방식을 사용하게 되어서 아쉬웠습니다.

- #### 프로젝트 관리 및 협업에 관한 내용
  - 첫 백엔드와의 협업이고 데이터를 주고 받을 때에 대한 이해도가 많이 부족해서 백엔드에서 물어보실 때나 물어볼 때 이해가 되지 않는 부분이 많았어서 백엔드에 대한 지식도 어느정도 필요하다는 것을 깨달았습니다.
  - 그래도 이번을 협업을 통해서 많이 알아가게 되었고 백엔드분과 시행착오를 겪으면서 api나 페이지네이션 등을 배울 수 있어서 좋았습니다.

#### 김민수
- #### 자랑하고 싶은 부분
  - 예약페이지와 예약결과 페이지에서는 Url 쿼리스트링을 사용하여 불필요한 API 호출을 줄이고, 보다 빠른 랜더링을 구현했습니다. 쿼리스트링을 통해 필요한 데이터만을 로드함으로써 서버 부하를 줄이고, 클라이언트 측의 성능을 향상시킴으로써 사용자 경험을 향상시킬 수 있도록 구현했습니다.  
  - SWR React Hooks를 사용하여 빠른 페이지네이션을 구현했습니다. SWR은 데이터 페칭을 단순화하고, 캐싱을 통해 데이터 재사용성을 극대화하여 빠른 응답 속도를 바탕으로 예약내역 페이지에서 사용자가 빠르고 원활하게 데이터를 조회할 수 있도록 구현했습니다.
  - 재사용가능한 컴포넌트를 구성하여 다양한 페이지에서 사용할 수 있도록 구현했습니다.
- #### 아쉬운 부분
  - Next.js의 SSR과 msw를 제대로 활용하지 못한 것이 아쉬움이 남습니다.

- #### 프로젝트 관리 및 협업에 관한 내용
  - 백엔드와의 협업이 처음이다보니 부족한 점이 많았던 것 같습니다. 이번 미니 프로젝트를 통해 많은 것들을 알게되어서 좋았습니다.