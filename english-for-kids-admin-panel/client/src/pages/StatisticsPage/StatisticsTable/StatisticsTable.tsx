import {
  JSXElementConstructor, MouseEvent, ReactElement, useState,
} from 'react';
import contentConstants from '../../../constants/contentConstants';
import sortConstants from '../../../constants/sortConstants';
import { Card } from '../../../db/cards';
import { sort } from '../../../services/sortService';
import { getCalculatedDate, Statistic } from '../../../services/statisticsService';
import './StatisticsTable.scss';
import TableSection from './TableSection/TableSection';

const {
  CATEGORY,
  TRANSLATION,
  WORD,
  TRAIN,
  PLAY,
  ERROR,
  PERCENT,
} = sortConstants;

interface TableSectionProps {
  card: Card;
  category: string;
  statistic: Statistic;
}

function StatisticsTable(): JSX.Element {
  const [sortBy, setSortBy] = useState(CATEGORY);
  const [orderBy, setOrderBy] = useState('asc');
  const dataForSections = getCalculatedDate();

  sort(dataForSections, sortBy);

  if (orderBy === 'desc') {
    dataForSections.reverse();
  }

  const sections = dataForSections.reduce((ac, {
    card,
    category,
    statistic,
    percent,
  }) => {
    ac.push(<TableSection
      key={Math.random().toString(36).slice(2, 10)}
      card={card}
      category={category}
      statistic={statistic}
      percent={percent}
    />);

    return ac;
  }, [] as ReactElement<TableSectionProps, JSXElementConstructor<TableSectionProps>>[]);

  const handleClick = ({ target }: MouseEvent<HTMLButtonElement>): void => {
    const { name } = target as HTMLButtonElement;

    if (name === sortBy) {
      setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(name);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" name={CATEGORY} onClick={handleClick}>
              {contentConstants.CATEGORY}
            </button>
          </th>
          <th>
            <button type="button" name={WORD} onClick={handleClick}>
              {contentConstants.WORD}
            </button>
          </th>
          <th>
            <button type="button" name={TRANSLATION} onClick={handleClick}>
              {contentConstants.TRANSLATION}
            </button>
          </th>
          <th>
            <button type="button" name={TRAIN} onClick={handleClick}>
              {contentConstants.TRAIN}
            </button>
          </th>
          <th>
            <button type="button" name={PLAY} onClick={handleClick}>
              {contentConstants.PLAY}
            </button>
          </th>
          <th>
            <button type="button" name={ERROR} onClick={handleClick}>
              {contentConstants.ERROR}
            </button>
          </th>
          <th>
            <button type="button" name={PERCENT} onClick={handleClick}>
              {contentConstants.PERCENT}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sections}
      </tbody>
    </table>
  );
}

export default StatisticsTable;
