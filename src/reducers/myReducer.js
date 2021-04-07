import { ACTION_TYPE } from 'actions';

const initialState = {
  pending: false,
  error: false,
  errorMsg: '',
  patient: {
    list: [
      {
        age: 0,
        birthDatetime: "string",
        ethnicity: "string",
        gender: "string",
        isDeath: true,
        personID: 0,
        race: "string",
        paramKey: "string"
      }
    ],
    page: 0,
    totalLength: 0,
  },
  genderList: [],
  raceList: [],
  ethnicityList: [],
  deathList: [],
  patientBrief: {
    conditionList: [],
    visitCount: 0
  },
  stats: [
    {
      count: 0,
      ethnicity: "string",
      gender: "string",
      race: "string"
    }
  ]
};

export const myReducer = (state = initialState, action) => {
  console.log(action.type);

  switch (action.type) {
    case ACTION_TYPE.GET_PATIENT_LIST.PENDING:
      return { ...state, pending: true, error: false };
    case ACTION_TYPE.GET_PATIENT_LIST.SUCCESS:
      return { ...state, pending: false, patient: action.payload.patient };
    case ACTION_TYPE.GET_PATIENT_LIST.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    case ACTION_TYPE.GET_GENDER_LIST.PENDING:
      return { ...state, pending: true, error: false };
    case ACTION_TYPE.GET_GENDER_LIST.SUCCESS:
      return { ...state, pending: false, genderList: action.payload.genderList };
    case ACTION_TYPE.GET_GENDER_LIST.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    case ACTION_TYPE.GET_RACE_LIST.PENDING:
      return { ...state, pending: true, error: false };
    case ACTION_TYPE.GET_RACE_LIST.SUCCESS:
      return { ...state, pending: false, raceList: action.payload.raceList };
    case ACTION_TYPE.GET_RACE_LIST.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    case ACTION_TYPE.GET_ETHNICITY_LIST.PENDING:
      return { ...state, pending: true, error: false };
    case ACTION_TYPE.GET_ETHNICITY_LIST.SUCCESS:
      return { ...state, pending: false, ethnicityList: action.payload.ethnicityList };
    case ACTION_TYPE.GET_ETHNICITY_LIST.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    case ACTION_TYPE.GET_DEATH_LIST.SUCCESS:
      return { ...state, deathList: action.payload.deathList };

    case ACTION_TYPE.GET_PATIENT_BRIEF.PENDING:
      return { ...state, pending: true, error: false };
    case ACTION_TYPE.GET_PATIENT_BRIEF.SUCCESS:
      return { ...state, pending: false, patientBrief: action.payload };
    case ACTION_TYPE.GET_PATIENT_BRIEF.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    case ACTION_TYPE.GET_PATIENT_STATS.PENDING:
      return { ...state, pending: true, error: false };
    case ACTION_TYPE.GET_PATIENT_STATS.SUCCESS:
      return { ...state, pending: false, stats: action.payload.stats };
    case ACTION_TYPE.GET_PATIENT_STATS.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    default:
      return state;
  }
};
