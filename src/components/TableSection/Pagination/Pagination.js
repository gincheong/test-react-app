import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

export const Pagination = (props) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfButtons, setNumberOfButtons] = useState(0);

  const BOX_COUNT = 4;

  useEffect(() => {
    // 나누어 떨어지지 않는 경우를 위해 소숫점 올림
    setNumberOfButtons(Math.ceil(props.totalLength / props.rowPerPage));
  }, [props.rowPerPage, props.totalLength]);
  
  useEffect(() => {
    // rowPerPage가 바뀌면, pagination 1 로 이동
    setCurrentPageNumber(1);
    props.setCurrentIdx(0);
  }, [props.rowPerPage]);

  const onClickPagination = (idx) => {
    if (idx < 0) { idx = 1; }
    else if (idx > numberOfButtons) { idx = numberOfButtons; }

    setCurrentPageNumber(idx + 1);
    props.setCurrentIdx(idx);
  };

  const renderButtons = () => {
    const buttonList = [];

    if (currentPageNumber - BOX_COUNT < 1) {
      // 현재 페이지가 왼쪽에 가까울 때
      for (let i = 1; i <= BOX_COUNT * 2 + 1; i++) {
        if (i <= numberOfButtons) {
          buttonList.push(i);
        }
      }
    } else if (currentPageNumber + BOX_COUNT > numberOfButtons) {
      // 현재 페이지가 가운데일 때
      for (let i = numberOfButtons - 2 * BOX_COUNT; i <= currentPageNumber + BOX_COUNT; i++) {
        if (i >= 1 && i <= numberOfButtons) {
          buttonList.push(i);
        }
      }
    } else {
      // 현재 페이지가 오른쪽에 가까울 때 
      for (let i = currentPageNumber - BOX_COUNT; i <= currentPageNumber + BOX_COUNT; i++) {
        if (i <= numberOfButtons) {
          buttonList.push(i);
        }
      }
    }

    return buttonList.map(each => 
      <button
        key={each}
        onClick={() => onClickPagination(each - 1)}
        disabled={currentPageNumber === each}
      >
        {each}
      </button>
    );
  };

  return (
    <section className="Pagination">
      <button
        onClick={() => onClickPagination(currentPageNumber - BOX_COUNT - 1)}
        disabled={currentPageNumber - BOX_COUNT - 1 < 0}
      >
        - {BOX_COUNT}
      </button>
      <button
        onClick={() => onClickPagination(0)}
        disabled={currentPageNumber === 1}
      >
        {1}
      </button>
      ...
      { renderButtons() }
      ...
      <button 
        onClick={() => onClickPagination(numberOfButtons - 1)}
        disabled={currentPageNumber === numberOfButtons}
      >
        {numberOfButtons}
      </button>
      <button
        onClick={() => onClickPagination(currentPageNumber + BOX_COUNT - 1)}
        disabled={currentPageNumber + BOX_COUNT > numberOfButtons}
      >
        + {BOX_COUNT}
      </button>
    </section>
  );  
};

Pagination.propTypes = {
  rowPerPage: PropTypes.number,
  currentIdx: PropTypes.number,
  setCurrentIdx: PropTypes.func,
  totalLength: PropTypes.number,
};
