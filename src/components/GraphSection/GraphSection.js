import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPatientStats } from 'actions';
import { Graph } from 'shared';
import { PieChart } from './PieChart';
import './GraphSection.scss';

export const GraphSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientStats());
  }, [dispatch]);

  return (
    <section className="GraphSection">
      { Graph.map(each => 
          <PieChart key={each.targets.toString()} targets={each.targets} />
        )
      }
    </section>
  );
};

