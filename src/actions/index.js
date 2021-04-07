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
  GET_RACE_LIST: {
    PENDING: '@test-react-app/GET_RACE_LIST/PENDING',
    SUCCESS: '@test-react-app/GET_RACE_LIST/SUCCESS',
    FAILURE: '@test-react-app/GET_RACE_LIST/FAILURE'
  },
  GET_ETHNICITY_LIST: {
    PENDING: '@test-react-app/GET_ETHNICITY_LIST/PENDING',
    SUCCESS: '@test-react-app/GET_ETHNICITY_LIST/SUCCESS',
    FAILURE: '@test-react-app/GET_ETHNICITY_LIST/FAILURE'
  },
  GET_DEATH_LIST: {
    SUCCESS: '@test-react-app/GET_DEATH_LIST/SUCCESS'
  },
  GET_PATIENT_BRIEF: {
    PENDING: '@test-react-app/GET_PATIENT_BRIEF/PENDING',
    SUCCESS: '@test-react-app/GET_PATIENT_BRIEF/SUCCESS',
    FAILURE: '@test-react-app/GET_PATIENT_BRIEF/FAILURE'
  },
  GET_PATIENT_STATS: {
    PENDING: '@test-react-app/GET_PATIENT_STATS/PENDING',
    SUCCESS: '@test-react-app/GET_PATIENT_STATS/SUCCESS',
    FAILURE: '@test-react-app/GET_PATIENT_STATS/FAILURE'
  }
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
          errorMsg: `GET_PATIENT_LIST: ${err}`
        });
        console.error(err);
      });
  };
};

export const getGenderList = () => {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_GENDER_LIST.PENDING });
    await fetch(`${API_ENDPOINT}/api/gender/list`)
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
          errorMsg: `GET_GENDER_LIST: ${err}`
        });
        console.error(err);
      });
  }
};

export const getRaceList = () => {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_RACE_LIST.PENDING });
    await fetch(`${API_ENDPOINT}/api/race/list`)
      .then(async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch({
          type: ACTION_TYPE.GET_RACE_LIST.SUCCESS,
          payload: await response.json()
        });
      })
      .catch(err => {
        dispatch({
          type: ACTION_TYPE.GET_RACE_LIST.FAILURE,
          errorMsg: `GET_RACE_LIST: ${err}`
        });
        console.error(err);
      });
  }
};

export const getEthnicityList = () => {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_ETHNICITY_LIST.PENDING });
    await fetch(`${API_ENDPOINT}/api/ethnicity/list`)
      .then(async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch({
          type: ACTION_TYPE.GET_ETHNICITY_LIST.SUCCESS,
          payload: await response.json()
        });
      })
      .catch(err => {
        dispatch({
          type: ACTION_TYPE.GET_ETHNICITY_LIST.FAILURE,
          errorMsg: `GET_ETHNICITY_LIST: ${err}`
        });
        console.error(err);
      });
  }
};

export const getDeathList = () => {
  return {
    type: ACTION_TYPE.GET_DEATH_LIST.SUCCESS,
    payload: {
      deathList: ["true", "false"]
    }
  }
};

/**
 * @param {number} person_id
 */
export const getPatientBrief = (person_id) => {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_PATIENT_BRIEF.PENDING });
    await fetch(`${API_ENDPOINT}/api/patient/brief/${person_id}`)
      .then(async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch({
          type: ACTION_TYPE.GET_PATIENT_BRIEF.SUCCESS,
          payload: await response.json()
        });
      })
      .catch(err => {
        dispatch({
          type: ACTION_TYPE.GET_PATIENT_BRIEF.FAILURE,
          errorMsg: `GET_PATIENT_BRIEF: ${err}`
        });
        console.error(err);
      });
  }
};

export const getPatientStats = () => {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_PATIENT_STATS.PENDING });
    await fetch(`${API_ENDPOINT}/api/patient/stats`)
      .then(async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch({
          type: ACTION_TYPE.GET_PATIENT_STATS.SUCCESS,
          payload: await response.json()
        });
      })
      .catch(err => {
        dispatch({
          type: ACTION_TYPE.GET_PATIENT_STATS.FAILURE,
          errorMsg: `GET_PATIENT_STATS: ${err}`
        });
        console.error(err);
      });
  }
};
