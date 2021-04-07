import { GraphSection, Header, TableSection } from 'components';
import { Spinner } from 'shared';
import { ErrorListener } from 'shared/ErrorListener/ErrorListener';
import './App.scss';

export const App = () => {
  return (
    <main className="App">
      <ErrorListener>
        <Spinner>
          <Header />
          <GraphSection />
          <TableSection />
        </Spinner>
      </ErrorListener>
    </main>
  );
};
