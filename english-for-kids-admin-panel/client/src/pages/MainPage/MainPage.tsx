import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import CategoriesList from './CategoriesList/CategoriesList';
import './MainPage.scss';

function MainPage(): JSX.Element {
  return (
    <div className="page">
      <Header />
      <CategoriesList />
      <Footer />
    </div>
  );
}

export default MainPage;
