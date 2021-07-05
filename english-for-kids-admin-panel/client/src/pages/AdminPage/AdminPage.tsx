import './AdminPage.scss';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import AdminHeader from './AdminHeader/AdminHeader';
import routesConstants from '../../constants/routesConstants';
import AdminCategories from './AdminCategories/AdminCategories';
import AdminWords from './AdminWords/AdminWords';

function AdminPage(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <div>
      <AdminHeader />
      <Switch>
        <Route exact path={path}>
          <AdminCategories />
        </Route>
        <Route path={`${path}${routesConstants.WORDS}`}>
          <AdminWords />
        </Route>
      </Switch>
    </div>
  );
}

export default AdminPage;
