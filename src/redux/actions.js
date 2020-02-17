import { 
  CREATE_GROUP, 
  DELETE_GROUP,
  CREATE_USER,
  DELETE_USER,
  MERGE_USERGROUP,
  UNMERGE_USERGROUP
} from './action-types.js'

export function createGroup(payload) {
  return { 
    type: CREATE_GROUP, 
    payload 
  };
};

export function deleteGroup(payload) {
  return { 
    type: DELETE_GROUP, 
    payload 
  };
};

export function createUser(payload) {
  return { 
    type: CREATE_USER, 
    payload 
  };
};

export function deleteUser(payload) {
  return { 
    type: DELETE_USER, 
    payload 
  };
};

export function mergeUserGroup(payload) {
  return { 
    type: MERGE_USERGROUP, 
    payload 
  };
};

export function unmergeUserGroup(payload){
  return {
    type: UNMERGE_USERGROUP,
    payload
  };
};