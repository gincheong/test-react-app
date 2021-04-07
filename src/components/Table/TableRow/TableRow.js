import { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRowBrief } from '..'
import { Patient } from 'shared';
import './TableRow.scss';

export const TableRow = (props) => {
  const [showBrief, setShowBrief] = useState(false);

  const onClickBrief = () => {
    setShowBrief(!showBrief);
  }

  return (
    <>
      <tr className="TableRow" onClick={onClickBrief}>
        {
          Patient.map((each, idx) => 
            <td key={idx}>{props.patient[each.key].toString()}</td>
          )
        }
      </tr>
      { showBrief && <TableRowBrief personID={props.patient.personID}/> }
    </>
  );
};

TableRow.propTypes = {
  patient: PropTypes.shape({
    personID: PropTypes.number,
    gender: PropTypes.string,
    birthDatetime: PropTypes.string,
    age: PropTypes.number,
    race: PropTypes.string,
    ethnicity: PropTypes.string,
    isDeath: PropTypes.bool
  })
};
