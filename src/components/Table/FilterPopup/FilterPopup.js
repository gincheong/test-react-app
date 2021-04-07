import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, ModalBackground } from 'shared';
import './FilterPopup.scss';

export const FilterPopup = (props) => {
  const [selectedRadio, setSelectedRadio] = useState(undefined);
  
  const store = useSelector(store => store.myReducer);
  const dispatch = useDispatch();
  
  const filter = Filter[props.filterTarget];

  useEffect(() => {
    // 컴포넌트 로드 시, 필터링 데이터 목록을 API 통해 받아온다
    if (filter.callback) {
      dispatch(filter.callback());
    }
  }, [dispatch, filter]);

  const isChecked = (eachFilterValue) => {
    if (props.filterTarget === props.filterColumn.key &&
        props.filterColumn.value === eachFilterValue) {
      return true;
    } else {
      return false;
    }
  };

  

  // !: 필터가 한 column에 대해서만 작동하게 되어 있음
  // ?: 필터가 한 column 내에서도 한 개 데이터만 고를 수 있음 (이건 구현사항 아닌 듯)
  const onClickApplyFilter = () => {
    // 현재 적용된 필터 정보를 바꿈
    if (selectedRadio) {
      props.setFilterColumn({
        key: props.filterTarget,
        value: selectedRadio
      });
      props.onClickClose();
    }
  };

  return (
    <ModalBackground>
      <div className="FilterPopup">
        <header className="FilterPopupHeader">
          필터 적용
          <button className="CloseButton" onClick={props.onClickClose}>
            <i className="fas fa-times"></i>
          </button>
        </header>
        { filter.type === 'radio' &&
            // 받아온 필터 데이터를 각각 radio 버튼으로 렌더링
            store[filter.storeName].map(each =>
              <div key={each}>
                <label onClick={() => setSelectedRadio(each)}>
                  <input value={each} type="radio" name="FilterPopup"
                    defaultChecked={isChecked(each)}
                  />
                  {each}
                </label>
              </div>
            )
        }
        { filter.type === 'number' &&
            'number input'
        }
      <button onClick={onClickApplyFilter}>적용</button>
      </div>
    </ModalBackground>
  );
};

FilterPopup.propTypes = {
  filterTarget: PropTypes.string,
  filterColumn: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  }),
  setFilterColumn: PropTypes.func
}