// Column명과 각 Row의 데이터 순서를 일치시키기 위한 데이터

/**
 * @param {string} key key값 이름
 * @param {string} name 표기용 한글 명칭
 * @param {string} paramKey 파라미터로 쓸 때의 이름 
 * @param {boolean} order 정렬 가능 여부
 * 
 * 순서대로 테이블에 표시됨
 */
export const Patient = [
  { 
    key: 'personID',
    name: '환자 id',
    order: true,
    paramKey: 'person_id',
  },
  { 
    key: 'gender', 
    name: '성별', 
    order: true,
    paramKey: 'gender',
  },
  {
    key: 'birthDatetime', 
    name: '생년월일',
    order: true,
    paramKey: 'birth',
  },
  {
    key: 'age',
    name: '나이',
    order: false
  },
  {
    key: 'race',
    name: '인종',
    order: true,
    paramKey: 'race',
  },
  {
    key: 'ethnicity',
    name: '민족',
    order: true,
    paramKey: 'ethnicity',
  },
  {
    key: 'isDeath',
    name: '사망 여부',
    order: true,
    paramKey: 'death',
  }
];