import { useAppSelector } from '../../../app/hooks';
import settingNumConstants from '../../../constants/settingNumConstants';
import stateConstants from '../../../constants/stateConstants';
import './ScoreBoard.scss';

const { MISS } = stateConstants;
const { STAR_MARGIN } = settingNumConstants;

function ScoreBoard(): JSX.Element {
  const { score } = useAppSelector((state) => state.scoreBoard);

  const list = score
    .reduceRight((ac: string[], item) => {
      ac.push(item);
      return ac;
    }, [])
    .map((item, index) => (
      <div
        key={Math.random().toString(36).slice(2, 10)}
        className={`star ${item === MISS ? 'star_wrong' : ''}`}
        style={{ right: `${STAR_MARGIN * index}px` }}
      />
    ));

  return (
    <div className="score-board">{list}</div>
  );
}

export default ScoreBoard;
