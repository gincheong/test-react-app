# 실행 전 준비사항

본 프로젝트에서 사용하는 API 서버 주소는 별도 파일에 작성되어 있으며, 해당 파일은 `.gitignore`에 추가되어 업로드되지 않았습니다.

따라서 해당 프로젝트를 이용하려면 사용자가 직접 파일을 프로젝트에 추가해야 합니다.

추가할 파일 경로는 `/src/actions/API_ENDPOINT.js`이며, 다음의 형태로 작성하면 됩니다.

```js
export const API_ENDPOINT = "http://주소";
// 맨 뒤에 / 를 붙이지 않아야 합니다.
```

# 실행방법

`git clone` 이후 프로젝트의 루트 디렉토리에서 `npm install` 을 통해 필요한 모듈을을 받습니다.

`npm run start` 명령어를 통해 프로젝트를 실행하고, 콘솔에 표기된 주소로 접속하여 내용을 확인할 수 있습니다.  
(기본 주소는 [http://localhost:3000](http://localhost:3000) 입니다)

# 구현 설명

`React.js`와 `React-Redux`, 그리고 파이형 그래프를 위한 `victory`를 사용했습니다.

### 각 문제에 따른 설명
1. 탐색할 수 있는 테이블 Component (`/src/components/TableSection`)
- API 이용
  - `/src/actions` 의 `getPatientList` 함수로 `/api/patient/list` API를 호출합니다.
- 목록에서 확인되어야 할 데이터
  - 데이터 Column명과, 그에 대응하는 한글 이름을 `/src/shared/models/Patient.js`에 정의했습니다.
  - 해당 파일을 수정하는 것으로 테이블의 Column 순서를 변경하거나, 표기명을 바꾸는 등 유동적으로 항목을 변경할 수 있게 했습니다.
- 페이징 관련 기능
  - `SelectBox` 컴포넌트로 페이지 당 row 갯수를 선택할 수 있게 했습니다.
    - 기본적으로 10, 50, 100 으로 설정할 수 있고, 전체 데이터를 확인할 수 있습니다.
  - `Pagination` 컴포넌트를 통해 Pagination을 구현했습니다.
    - 현재 페이지 번호를 기준으로, 좌우로 4개씩 버튼을 표시했습니다.
    - "페이지 당 row 갯수" 를 변경시에, 자동으로 1번 페이지로 이동됩니다.
    - "첫 번째 페이지"와 "마지막 페이지" 는 항시 노출시키며, 4개 페이지씩 이동할 버튼을 추가했습니다.
- 정렬 관련 기능
  - 위아래 화살표 모양의 아이콘을 클릭하여 정렬기능을 사용할 수 있습니다.
  - 기본 상태(위아래 화살표) -> 오름차순(위 화살표) -> 내림차순(아래 화살표) 순서로 순환하며 작동합니다.

2. 테이블 필터 기능
- API 이용
  - `/src/actions` 에 각 API 호출 함수를 정의했습니다.
- 조건을 이용하여 필터 작동
  - `/src/shared/models/Filter.js` 에 정의한 대로 필터 기능을 작성했습니다.
    - 해당 파일에 각 Column에 따라 `type` 변수를 정의하여, 필터 기능을 각각 다른 형태로 작동하게 했습니다.
    - 각 Column에 따른, 필터링에 필요한 API 호출 함수를 지정했습니다.
  - 필터 아이콘을 클릭하면, 팝업이 노출되며 해당 Column의 데이터 중 하나로 필터링이 가능합니다.
    - 팝업의 "적용" 버튼을 누르면 선택한 필터링이 적용되고, "X" 버튼을 누르면 선택사항이 적용되지 않습니다.
    - 필터링이 적용된 Column에는, 필터 아이콘이 다른 색이 됩니다.
    - 핕터링이 적용된 Column의 아이콘을 다시 클릭 시에, 현재 적용된 필터링 값이 체크된 상태로 팝업이 노출됩니다.
    - 테이블 위의 *적용된 필터 제거하기* 버튼으로 현재 적용된 필터링를 취소할 수 있습니다.
    - 한 번에 하나의 Column에 대해서만 필터링이 가능합니다.
    - 하나의 Column 안에서도, 하나의 데이터로만 필터링이 가능합니다.

3. 목록에서 클릭 시 상세 정보 보여주기
- API 이용
  - `/src/actions` 의 함수를 통해 `/api/patient/brief/{person_id}` API를 호출합니다.
- 상세 정보에 데이터 표현하기
  - `TableSection` 컴포넌트의 테이블의 각 Row에 해당하는 `TableRow` 컴포넌트에서, 클릭 이벤트를 통해 `TableRowBrief` 컴포넌트를 렌더링합니다.
  - 한 번 Row를 클릭 시 상세 정보가 노출되고, 한 번 더 클릭 시 숨겨집니다.

4. 테이블 Component 위에 그래프 추가 *[미완성]*
- API 이용
  - `/src/actions` 의 `getPatientStats` 함수를 통해 `/api/patient/stats` API를 호출합니다.
- 표시할 그래프의 종류
  - gender
  - race
  - ethnicity
  - (gender + race) *[미구현]*
  - (gender + ethnicity) *[미구현]*

5. 2번의 테이블 필터링에 따라, 4번의 그래프 변경하기 [미구현]

### 추가 항목
- `/src/shared/Spinner` 컴포넌트
  - store에 "pending" 변수를 추가하여, API 호출에 따라 해당 값을 변경시키며 API 호출 대기 중에 Spinner를 표시합니다.
- `/src/shared/ErrorListener` 컴포넌트
  - store에 "error", "errorMsg" 변수를 추가하여, API 호출에 따라 해당 값을 변경시키며, 에러 발생 시 경고 메시지를 표시합니다.

두 컴포넌트 모두 App 컴포넌트에 사용되었습니다.

# 구현하지 못한 부분에 대해서

- 문제 4
  - 각 Column에 따른 데이터('gender'에는, 'M'과 'F'가 있음)를 `/api/patient/stats`의 결과를 기반으로 정리했는데, "필터 기능" 에 사용한 API를 사용해야 합니다.
  - Column이 2개인 그래프는, 각 Column의 데이터를 호출하여, 그 두 데이터 리스트를 병합하여 `/api/patient/stats`을 탐색할 때 2개의 조건으로 데이터를 가져오게 해야 합니다.
    - gender와, race를 예시로 들면,
      ```
      [{ gender: "A", race: "123" }, { gender: "A", race: "456" }, ... ]
      ```
      위와 같은 데이터를 만들어야 합니다.

- 문제 5
  - 문제 4에서, `PieChart` 컴포넌트가 각 Column에 대한 데이터 갯수를 계산할 때 `TableSection` 컴포넌트의 `filterColumn` state를 참조하여, 현재 필터가 적용된 데이터의 경우 갯수 계산을 제외시킬 수 있습니다.
  - `filterColumn` state 값을 두 컴포넌트가 공유하기 위해, redux의 `store`를 사용하는 것이 바람직해 보입니다.