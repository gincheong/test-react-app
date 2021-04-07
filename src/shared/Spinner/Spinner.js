import { useSelector } from 'react-redux';
import { ModalBackground } from '..';
import './Spinner.scss';

export const Spinner = (props) => {
  const store = useSelector(store => store.myReducer);

  return (
    <>
      {props.children}
      { store.pending &&
        <ModalBackground>
          <div className="Spinner">
            Now Loading
          </div>
        </ModalBackground>
      }
    </>
  );
};
