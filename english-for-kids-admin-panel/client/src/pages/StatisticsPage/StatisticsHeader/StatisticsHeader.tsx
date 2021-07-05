import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import './StatisticsHeader.scss';
import HamburgerMenu from '../../../components/Header/HamburgerMenu/HamburgerMenu';
import { resetStatistics } from '../../../services/statisticsService';
import routesConstants from '../../../constants/routesConstants';

export interface StatisticsHeaderProps {
  updateTable: Dispatch<SetStateAction<number>>;
}

function StatisticsHeader({ updateTable }: StatisticsHeaderProps): JSX.Element {
  const history = useHistory();

  const handleClick = ({ target }: MouseEvent<HTMLButtonElement>): void => {
    const { name } = target as HTMLButtonElement;

    if (name === 'repeat') {
      history.push(routesConstants.REPEAT);
    } else if (name === 'reset') {
      resetStatistics();
      updateTable(Math.random());
    }
  };

  return (
    <div className="statistics-header">
      <HamburgerMenu />
      <button type="button" name="repeat" onClick={handleClick}>
        Repeat difficult words
      </button>
      <button type="button" name="reset" onClick={handleClick}>
        Reset
      </button>
    </div>
  );
}

export default StatisticsHeader;
