import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import StatisticsHeader from './StatisticsHeader/StatisticsHeader';
import StatisticsTable from './StatisticsTable/StatisticsTable';
import './StatisticsPage.scss';

function StatisticsPage(): JSX.Element {
  const [, updateTable] = useState(0);

  return (
    <div className="page">
      <StatisticsHeader updateTable={updateTable} />
      <div className="table-container">
        <StatisticsTable />
      </div>
      <Footer />
    </div>
  );
}

export default StatisticsPage;
