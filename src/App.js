import { GraphSection, Header, TableSection } from 'components';
import './App.scss';

export const App = () => {
  return (
    <main className="App">
      <Header />
      <GraphSection />
      <TableSection />
    </main>
  );
};
