import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import CardList from './CardList/CardList';
import StartBtn from './StartBtn/StartBtn';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import { useAppDispatch } from '../../app/hooks';
import { setCurrentWord, setWords, stopGame } from './StartBtn/startBtnSlice';
import { setScore } from './ScoreBoard/scoreBoardSlice';
import Footer from '../../components/Footer/Footer';

function CategoryPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(stopGame());
    dispatch(setScore([]));
    dispatch(setCurrentWord(''));
    dispatch(setWords([]));
  });

  return (
    <div className="page">
      <Header />
      <ScoreBoard />
      <CardList />
      <StartBtn />
      <Footer />
    </div>
  );
}

export default CategoryPage;
