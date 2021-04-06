import PropTypes from 'prop-types';
import { Patient } from 'shared';

export const TableRow = (props) => {
  return (
    <tr>
      {
        Patient.map((each, idx) => 
          <td key={idx}>{props.patient[each.key].toString()}</td>
        )
      }
    </tr>
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