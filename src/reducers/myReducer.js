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
        race: "string"
      }
    ],
    page: 0,
    totalLength: 0,
  },
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
      return { ...state, pending: false, ethnicityList: action.payload.ethnicityList };
    case ACTION_TYPE.GET_GENDER_LIST.FAILURE:
      return { ...state, pending: false, error: true, errorMsg: action.errorMsg };

    default:
      return state;
  }
};
