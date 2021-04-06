import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientList } from 'actions';
import { SelectBox } from 'components';
import { Patient } from 'shared';
import { Pagination, TableRow } from '.';
import './Table.scss';

export const Table = () => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [orderColumn, setOrderColumn] = useState(undefined);
  const [orderDesc, setOrderDesc] = useState(false);

  const store = useSelector(store => store.myReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientList({
      page: currentIdx + 1,
      length: rowPerPage,
      order_column: orderColumn,
      order_desc: orderDesc
    }));
  }, [dispatch, currentIdx, rowPerPage, orderColumn, orderDesc]);

  const onClickOrderColumn = (key) => {
    Patient.forEach(each => {
      if (each.key === key && each.order) {
        if (each.paramKey === orderColumn) {
          // 오름차순 -> 내림차순 -> 기본값
          if (orderDesc) {
            setOrderColumn(undefined);
          }
          setOrderDesc(!orderDesc);
        } else {
          setOrderDesc(false);
          setOrderColumn(each.paramKey);
        }
      }
    });
  };

  return (
    <section className="Table">
      <SelectBox
        label="페이지 당 표시할 데이터 수 :"
        options={[10, 50, 100, store.patient.totalLength]}
        callback={setRowPerPage}
      />
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
                  <span className="OrderColumnButton"
                    onClick={() => onClickOrderColumn(each.key)}
                  >
                    { each.paramKey &&
                        ( each.paramKey !== orderColumn ?
                          <i className="fas fa-sort"></i>
                        :
                          ( orderDesc ?
                            <i className="fas fa-sort-down"></i>
                          :
                            <i className="fas fa-sort-up"></i>
                          )
                        )
                    }
                  </span>
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
    </section>
  )
};
