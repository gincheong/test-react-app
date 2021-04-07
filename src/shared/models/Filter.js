import { getDeathList, getEthnicityList, getGenderList, getRaceList } from 'actions';

export const Filter = {
  person_id: {
    type: null // 필터 적용하지 않음
  },
  gender: {
    type: 'radio', // 필터 방식
    callback: getGenderList, // 필터링할 컬럼 데이터를 가져오는 API 
    storeName: 'genderList' // API 실행 결과가 저장될 store의 변수명
  },
  birth: {
    type: null
  },
  age: {
    type: 'number',
    min: 'age_min',
    max: 'age_max'
  },
  race: {
    type: 'radio',
    callback: getRaceList,
    storeName: 'raceList'
  },
  ethnicity: {
    type: 'radio',
    callback: getEthnicityList,
    storeName: 'ethnicityList'
  },
  death: {
    type: 'radio',
    callback: getDeathList,
    storeName: 'deathList'
  }
}

