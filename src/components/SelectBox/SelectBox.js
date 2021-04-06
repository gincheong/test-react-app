import PropTypes from 'prop-types';
import './SelectBox.scss';

export const SelectBox = (props) => {
  const onSelectOption = (event) => {
    const $target = event.target;
    const selectedValue = $target[$target.selectedIndex].value;

    props.callback(parseInt(selectedValue));
  };

  return (
    <label className="SelectBox">
      {props.label}
      <select onChange={onSelectOption}>
        {
          props.options.map((each, idx) => 
            <option key={idx}>{each}</option>
          )
        }
      </select>
    </label>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  callback: PropTypes.func,
};