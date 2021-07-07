import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import AdminHeader from './AdminHeader/AdminHeader';
import routesConstants from '../../constants/routesConstants';
import AdminCategories from './AdminCategories/AdminCategories';
import AdminWords from './AdminWords/AdminWords';
import Footer from '../../components/Footer/Footer';
import pathsConstants from '../../constants/pathsConstants';
// import pathsConstants from '../../constants/pathsConstants';

function AdminPage(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <div className="page">
      <AdminHeader />
      <Switch>
        <Route exact path={path}>
          <AdminCategories />
        </Route>
        <Route path={path + routesConstants.WORDS + pathsConstants.CATEGORY_PARAM}>
          <AdminWords />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default AdminPage;
