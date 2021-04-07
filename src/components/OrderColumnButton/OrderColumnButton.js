import PropTypes from 'prop-types';
import './OrderColumnButton.scss';

export const OrderColumnButton = (props) => {

  return (
    <button className="OrderColumnButton"
      onClick={props.onClick}>
      { props.paramKey !== props.orderColumn ?
        <i className="fas fa-sort"></i>
      :
        ( props.orderDesc ?
          <i className="fas fa-sort-down"></i>
        :
          <i className="fas fa-sort-up"></i>
        )
      }
    </button>
  );
};

OrderColumnButton.propTypes = {
  paramKey: PropTypes.string,
  orderColumn: PropTypes.string,
  orderDesc: PropTypes.bool
};
