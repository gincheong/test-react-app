import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryTooltip } from 'victory';
import './PieChart.scss';

// !: 두 개 이상의 column으로 그래프를 그리지 못함
export const PieChart = (props) => {
  const [columns, setColumns] = useState({});

  const store = useSelector(store => store.myReducer);

  useEffect(() => {
    const pies = {};

    store.stats.forEach(each => {
      if (Object.keys(pies).includes(each[props.targets])) {
        pies[each[props.targets]] += each.count;
      } else {
        pies[each[props.targets]] = each.count;
      }
    });
    
    setColumns(pies);
  }, [store.stats, props.targets]);

  const getPieData = () => {
    const pieData = [];
    Object.entries(columns).forEach(each => {
      const [label, y] = each;
      pieData.push({ label, y });
    });
    return pieData;
  };

  return (
    <div className="PieChart">
      <VictoryPie
        colorScale="qualitative"
        labelComponent={<VictoryTooltip />}
        name={props.name}
        data={getPieData()}
        responsive={false}
      />
      <div>
        { Object.entries(columns).map(each => {
            const [label, y] = each;
            return (
              <div key={label}>{label} : {y}</div>
            )
          })
        }
      </div>
    </div>
  );
};

PieChart.propTypes = {
  targets: PropTypes.array,
  name: PropTypes.string
};