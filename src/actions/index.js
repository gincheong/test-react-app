import { API_ENDPOINT } from './API_ENDPOINT';
import { getURLSearchParams } from 'utils';

export const ACTION_TYPE = {
  GET_PATIENT_LIST: {
    PENDING: '@test-react-app/GET_PATIENT_LIST/PENDING',
    SUCCESS: '@test-react-app/GET_PATIENT_LIST/SUCCESS',
    FAILURE: '@test-react-app/GET_PATIENT_LIST/FAILURE'
  },
  GET_GENDER_LIST: {
    PENDING: '@test-react-app/GET_GENDER_LIST/PENDING',
    SUCCESS: '@test-react-app/GET_GENDER_LIST/SUCCESS',
    FAILURE: '@test-react-app/GET_GENDER_LIST/FAILURE'
  },
};

/**
 * @param {number} page 1, 시작 번호
 * @param {number} length 0, 0이면 전체 데이터 리턴
 * @param {string} order_column null (person_id, gender, birth, race, ethnicity, death)
 * @param {string} order_desc false
 * @param {string} gender null
 * @param {string} race null
 * @param {string} ethnicity null
 * @param {number} age_min null
 * @param {number} age_max null
 * @param {boolean} death null
 */
export const getPatientList = ({
    page, length, order_column, order_desc, gender,
    race, ethnicity, age_min, age_max, death
  }) => {
    return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_PATIENT_LIST.PENDING });

    const params = getURLSearchParams({
      page, length, order_column, order_desc, gender,
      race, ethnicity, age_min, age_max, death
    });

    await fetch(`${API_ENDPOINT}/api/patient/list?${params}`)
      .then(async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch({
          type: ACTION_TYPE.GET_PATIENT_LIST.SUCCESS,
          payload: await response.json()
        });
      })
      .catch(err => {
        dispatch({
          type: ACTION_TYPE.GET_PATIENT_LIST.FAILURE,
          errorMsg: 'GET_PATIENT_LIST 에서 오류가 발생했습니다.'
        });
        console.error(err);
      });
  };
};

export const getGenderList = () => {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_GENDER_LIST.PENDING });
    await fetch(`${API_ENDPOINT}/api/patient/list`)
      .then(async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch({
          type: ACTION_TYPE.GET_GENDER_LIST.SUCCESS,
          payload: await response.json()
        });
      })
      .catch(err => {
        dispatch({
          type: ACTION_TYPE.GET_GENDER_LIST.FAILURE,
          errorMsg: 'GET_GENDER_LIST 에서 오류가 발생했습니다.'
        });
        console.error(err);
      });
  }
};