import store from '../../js/localStore';
import { createReducer } from '@reduxjs/toolkit';
import { 
  CREATE_GROUP, 
  DELETE_GROUP,
  CREATE_USER,
  DELETE_USER,
  MERGE_USERGROUP,
  UNMERGE_USERGROUP
} from '../action-types.js';

const rootReducer = createReducer(store.initialState, {
  [CREATE_GROUP]: (state, action) => {
    const { title } = action.payload;
    state.groups[store.id_courses] = {
      id: store.id_courses,
      title,
      users: {}
    };
    store.id_courses++
    store.updateCourses(state.groups);
  },
  [DELETE_GROUP]: (state, action) => {
    const { id } = action.payload;
    const usersIDs = state.groups[id].users;
    for( const [key] of Object.entries(usersIDs) ){
      delete state.users[key].groups[id];
    }
    delete state.groups[id];
    store.updateCourses(state.groups);
    store.updateUsers(state.users);
  },
  [CREATE_USER]: (state, action) => {
    const {firstname, lastname, email, groups} = action.payload;
    state.users[store.id_users] = {
      id: store.id_users,
      firstname,
      lastname,
      email,
      groups,
      status: true
    };
    for( const [key] of Object.entries(groups) ){
      if( state.groups[key] ){
        state.groups[key].users[store.id_users] = store.id_users;
      };
    };
    store.id_users++
    store.updateUsers(state.users);
    store.updateCourses(state.groups);
  },
  [DELETE_USER]: (state, action) => {
    const { id } = action.payload;
    const userGroups = state.users[id].groups;
    for( const [key] of Object.entries(userGroups) ){
      delete state.groups[key].users[id];
    };
    delete state.users[id];
    store.updateUsers(state.users);
    store.updateCourses(state.groups);
  },
  [MERGE_USERGROUP]: (state, action) => {
    const {userid, groupid} = action.payload;
    state.groups[groupid].users[userid] = userid;
    state.users[userid].groups[groupid] = groupid;
    store.updateUsers(state.users);
    store.updateCourses(state.groups);
  },
  [UNMERGE_USERGROUP]: (state, action) => {
    const { id, groupid } = action.payload;
    delete state.users[id].groups[groupid];
    delete state.groups[groupid].users[id];
    store.updateUsers(state.users);
    store.updateCourses(state.groups);
  }
});

export default rootReducer;