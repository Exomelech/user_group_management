import { Link } from 'react-router-dom';

export default () => (
  <header>
    <div className='header__title'>
      <h3>Courses and user managment system</h3>
    </div>
    <nav className = 'header__nav'>
      <div className='nav__item'><Link to='/'>Home</Link></div>
      <div className='nav__item'><Link to="/courses">Courses</Link></div>
      <div className='nav__item'><Link to="/users">Users</Link></div>
    </nav>
  </header>
);