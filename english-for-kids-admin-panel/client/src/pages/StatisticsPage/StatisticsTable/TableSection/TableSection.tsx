import { Card } from '../../../../db/cards';
import { Statistic } from '../../../../services/statisticsService';

export interface TableSectionProps {
  card: Card;
  category: string;
  statistic: Statistic;
  percent: number;
}

function TableSection({
  card: { word, translation },
  category,
  statistic: { train, play, error },
  percent,
}: TableSectionProps): JSX.Element {
  return (
    <tr>
      <td>{category}</td>
      <td>{word}</td>
      <td>{translation}</td>
      <td>{train}</td>
      <td>{play}</td>
      <td>{error}</td>
      <td>{percent}</td>
    </tr>
  );
}

export default TableSection;
