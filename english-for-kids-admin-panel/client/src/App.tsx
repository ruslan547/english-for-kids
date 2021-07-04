import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import routesConstants from './constants/routesConstants';
import { useAppSelector } from './app/hooks';
import FinishPage from './pages/FinishPage/FinishPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import contentConstants from './constants/contentConstants';
import pathsConstants from './constants/pathsConstants';

function App() {
  const { appState } = useAppSelector((state) => state.toggleSwitch);

  return (
    <div className="app" data-theme={appState}>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path={routesConstants.MAIN}>
              <MainPage />
            </Route>
            <Route path={`${routesConstants.CATEGORY}${pathsConstants.CATEGORY_PARAM}`}>
              <CategoryPage />
            </Route>
            <Route path={routesConstants.STATISTICS}>
              <StatisticsPage />
            </Route>
            <Route path={routesConstants.FINISH}>
              <FinishPage />
            </Route>
            <Route path={routesConstants.REPEAT}>
              <CategoryPage />
            </Route>
            <Route path={routesConstants.ADMIN}>
              <AdminPage />
            </Route>
            <Route path={routesConstants.ALL}>
              <div>{contentConstants.NOT_FOUND}</div>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
