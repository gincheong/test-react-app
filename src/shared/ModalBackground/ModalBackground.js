import PropTypes from 'prop-types';
import './ModalBackground.scss';

export const ModalBackground = (props) => {
  return (
    <div className="ModalBackground">
      {props.children}
    </div>
  );
};

ModalBackground.propTypes = {
  children: PropTypes.node
}