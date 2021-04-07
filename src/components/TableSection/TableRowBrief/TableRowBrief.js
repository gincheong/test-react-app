import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatientBrief } from 'actions';
import { Patient } from 'shared';

export const TableRowBrief = (props) => {
  const store = useSelector(store => store.myReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientBrief(props.personID));
  }, [dispatch, props.personID]);

  return (
    <tr>
      { console.log(store) }
      <td>
        {props.personID}
        <br />
        상세 정보
      </td>
      <td colSpan={Patient.length - 1}>
        <div>
          전체 방문 수 : {store.patientBrief.visitCount}
        </div>
        <div>진단 정보 : </div>
        { store.patientBrief.conditionList.map((each, idx) => 
            // ?: key 중복 회피?
            <div key={props.personID + each + idx}>
              {each}
            </div>
          )
        }
      </td>
    </tr>
  );
};

TableRowBrief.propTypes = {
  personID: PropTypes.number
};
