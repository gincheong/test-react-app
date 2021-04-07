import PropTypes from 'prop-types';
import './FilterButton.scss';

export const FilterButton = (props) => {
  const isSelected = () => {
    if (props.filterColumn.key === props.paramKey) {
      return " Selected";
    }
    return "";
  };

  return (
    <button
      className={"FilterButton" + isSelected()}
      onClick={props.onClick}
    >
      <i className="fas fa-filter"></i>
    </button>
  )
};

FilterButton.propTypes = {
  onClick: PropTypes.func,
  filterColumn: PropTypes.object,
  paramKey: PropTypes.string
};