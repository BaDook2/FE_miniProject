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
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

- collaboration tool<br>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> <img alt="Notion" src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> <img alt="Slack" src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>

- Design<br>
[<img alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>](https://www.figma.com/design/Q54rP5deHWDnmndclAex5L/miniproject?t=OlUgedB6VZ6jKgV4-0)

- deploy<br>
<img alt="Vercel" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>


## UserFlow
![UserFlow](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/74d8cd7b-e403-4f45-ac94-5c544dd47d59)

## 페이지 설명

### 로그인 · 회원가입 · 이메일 인증
![login](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/31af90f3-4103-4428-85bb-f276861b103e)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/29594d88-1b0d-40be-89b4-5d375a40cbb6)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/2717a221-e6a1-49a5-a2e0-40c8cca3bb1d)
- 장바구니, 예약 등 로그인이 필요한 서비스를 이용하기 위해 회원가입 및 로그인이 가능합니다.
- 회원가입 시 `이메일 인증`을 위한 메일이 전송됩니다.

### 메인 화면 (전체 상품 조회)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/1c5abd4d-fcd9-452a-b454-996433128a49)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/c445d87b-e6e5-4382-8ed4-e521807da94f)
- header에는 `메인페이지`, `예약내역`, `장바구니`, `로그인` or `로그아웃`을 표시합니다.
- 카테고리는 `호텔`, `펜션`, `모텔`, `민박`, `콘도미니엄`을 선택할 수 있습니다.
- 전체 상품 조회는 `React Query`의 무한 스크롤 기능을 이용하였으며 queryClient를 사용해 SessionStorage에 저장하여 뒤로가기로 돌아왔을 때 scroll의 위치를 기억해 보여줍니다.
- 최저가, 50000원, 80000원, 100000원이상으로 필터링을 할 수 있습니다.
- 사용자 편의성을 위한 상단 버튼이 있습니다.

### 개별 상품 조회
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/22d6a808-1d77-4e55-9852-a30d8e89d8f1)
![image](https://github.com/Yeojin-Kim12/my-first-blog/assets/79198245/8c523d69-6804-42c4-89b6-02390112d1ca)
- 개별 상품 조회를 할 때 `인원`, `체크인`, `체크아웃` 시간을 선택할 수 있습니다.
- 해당 페이지에서 상품을 바로 예약하거나 장바구니에 추가할 수 있습니다.
- 오늘 날짜 이전의 상품일 땐 장바구니에 추가할 수 없습니다.

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

## 느낀점
#### 장경빈
 - 

#### 김민수
- 

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
