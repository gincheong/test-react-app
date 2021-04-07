import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientList } from 'actions';
import { FilterButton, OrderColumnButton, SelectBox } from 'components';
import { Filter, Patient } from 'shared';
import { FilterPopup, Pagination, TableRow } from '.';
import './Table.scss';

export const Table = () => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [orderColumn, setOrderColumn] = useState(undefined);
  const [orderDesc, setOrderDesc] = useState(false);

  const [filterTarget, setFilterTarget] = useState(false);
  // 현재 popup의 대상이 어떤 column인지
  const [filterColumn, setFilterColumn] = useState({ key: undefined, value: undefined });
  // 현재 filter가 적용된 column과, filter 조건
  const [numberFilter, setNumberFilter] = useState({ age_min: null, age_max: null });
  // !: 재사용 가능한 형태가 아님
  
  const store = useSelector(store => store.myReducer);
  const dispatch = useDispatch();
  
  const rowPerPagePreset = [10, 50, 100, store.patient.totalLength];

  useEffect(() => {
    console.log({[filterColumn.key]: filterColumn.value});
    dispatch(getPatientList({
      page: currentIdx + 1,
      length: rowPerPage,
      order_column: orderColumn,
      order_desc: orderDesc,
      [filterColumn.key]: filterColumn.value,
      ...numberFilter
    }));
  }, [dispatch, currentIdx, rowPerPage, orderColumn, orderDesc, filterColumn, numberFilter]);

  const onClickOrderColumn = (paramKey) => {
    if (paramKey === orderColumn) {
      // 오름차순 -> 내림차순 -> 기본값 순으로 상태 변경
      if (orderDesc) {
        setOrderColumn(undefined);
      }
      setOrderDesc(!orderDesc);
    } else {
      setOrderDesc(false);
      setOrderColumn(paramKey);
    }
  };

  const onClickFilter = (paramKey) => {
    setFilterTarget(paramKey);
  };

  const onClickClearFilter = () => {
    setFilterColumn({ key: undefined, value: undefined });
    setNumberFilter({ age_min: undefined, age_max: undefined });
  };

  return (
    <section className="Table">
      <SelectBox
        label="페이지 당 표시할 데이터 수 :"
        options={rowPerPagePreset}
        callback={setRowPerPage}
      />
      <div>
        <button type="button" onClick={onClickClearFilter}>
          적용된 필터 제거하기
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td colSpan={Patient.length}>
              GET_PATIENT_LIST
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              Patient.map(each =>
                <td key={each.key} className="Column">
                  {each.name}

                  { each.order &&
                    <OrderColumnButton
                      onClick={() => onClickOrderColumn(each.paramKey)}
                      paramKey={each.paramKey}
                      orderColumn={orderColumn}
                      orderDesc={orderDesc}
                    />
                  }
                  { Filter[each.paramKey].type &&
                    <FilterButton
                      onClick={() => onClickFilter(each.paramKey)}
                      filterColumn={filterColumn}
                      paramKey={each.paramKey}
                    />
                  }
                </td>
              )
            }
          </tr>
          {
            store.patient.list.map(each => 
              <TableRow key={each.personID} patient={each} />
            )
          }
        </tbody>
      </table>
      <Pagination 
        rowPerPage={rowPerPage} 
        currentIdx={currentIdx} setCurrentIdx={setCurrentIdx}
        totalLength={store.patient.totalLength}
      />
      {
        filterTarget &&
          <FilterPopup
            filterTarget={filterTarget}
            filterColumn={filterColumn}
            setFilterColumn={setFilterColumn}
            onClickClose={() => setFilterTarget(false)}
            numberFilter={numberFilter}
            setNumberFilter={setNumberFilter}
          />
      }

    </section>
  )
};
