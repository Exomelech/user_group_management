import { Switch, Route } from 'react-router-dom';
import Home from './Home';

import Courses from './Courses';
import Group from './Group';
import Users from './Users';
import User from './User';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path='/courses' component={Courses}/>
    <Route path="/courses/:id" component={Group} />
    <Route exact path='/users' component={Users}/>
    <Route path="/users/:id" component={User} />
    <Route component={ () => (<h1>Not found</h1>) } />
  </Switch>
);