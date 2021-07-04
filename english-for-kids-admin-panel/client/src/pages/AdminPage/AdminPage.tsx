import './AdminPage.scss';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

function AdminPage(): JSX.Element {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <ul>
        <li>
          <Link to={url} />
        </li>
        <li>
          <Link to={url + '/words'} />
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <div>category</div>
        </Route>
        <Route path={path + '/words'}>
          <div>words</div>
        </Route>
      </Switch>
    </div>
  );
}

export default AdminPage;
