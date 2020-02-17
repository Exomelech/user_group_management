export default (()=>{
  const courses = localStorage.getItem('courseslist') !== null ? JSON.parse(localStorage.getItem('courseslist')) : {};
  const users = localStorage.getItem('usersList') !== null ? JSON.parse(localStorage.getItem('usersList')) : {};

  const localStore = {};

  localStore.updateCourses = (groups, id = localStore.id_courses) => {
    courses.id = id;
    courses.groups = groups;
    localStorage.setItem('courseslist', JSON.stringify(courses));
  };

  localStore.updateUsers = (newUsers, id = localStore.id_users) => {
    users.id = id;
    users.users = newUsers;
    localStorage.setItem('usersList', JSON.stringify(users));
  };

  localStore.id_courses = 1;
  localStore.id_users = 1;

  localStore.initialState = {
    groups: {},
    users: {}
  };

  if( courses.id ){
    localStore.id_courses = courses.id;
    localStore.initialState.groups = courses.groups;
  };
  if( users.id ){
    localStore.id_users = users.id;
    localStore.initialState.users = users.users;
  };

  return localStore;

})();