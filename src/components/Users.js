import { Link } from 'react-router-dom';
import CreateNewUser from './CreateNewUser';
import AddUserToGroup from './AddUserToGroup';
import { connect } from "react-redux";
import { deleteUser, unmergeUserGroup } from '../redux/actions';

const UsersItem = (props) => {
  const {firstname, lastname, email, id, remove, groupId} = props;
  return(
    <div className='users__list-item'>
      <div className='users__item-fullname'><Link to={`/users/${id}`}>{`${firstname} ${lastname}`}</Link></div>
      <div className='users__item-email'>{email}</div>
      <div className='users__item-id'>{id}</div>
      <div className='users__item-actions'>
        { groupId 
          ? <button 
            type="submit" 
            onClick={remove}
          >Remove user from group</button>
          : <button 
            type="submit" 
            onClick={remove}
          >Delete user</button> 
        }
      </div>
    </div>
  );
};

class Users extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      popup: false,
      popupAdd: false
    };
  };

  togglePop(){
    this.setState({
      popup: !this.state.popup
    });
  };

  togglePopAdd(){
    this.setState({
      popupAdd: !this.state.popupAdd
    });
  };

  render(){

    const {popup, popupAdd} = this.state;
    const { groupID, users, deleteUser, unmergeUserGroup } = this.props;
    const _users = [];
    for(const [_, el] of Object.entries(users)){
      if( groupID && el.groups[groupID] || !groupID ){
        _users.push(<UsersItem 
          firstname={el.firstname}
          lastname={el.lastname}
          email={el.email}
          id={el.id}
          key={el.id}
          remove={() => {
            return (groupID 
            ? unmergeUserGroup({id: el.id, groupid:groupID})
            : deleteUser({ id:el.id }));
          }}
          groupId={groupID}
        />);
      };
    };

    return(
      <div className='users'>
        <div className='list__header'>
          <div className='list__header-controls'>
            <button type='submit' onClick={() => this.togglePop()}>Create user</button>
            { groupID
              ? <button type='submit' onClick={() => this.togglePopAdd()}>Add user</button>
              : null
            }
          </div>
          <h1 className='list__title'>USERS</h1>
          <div className='list__search'></div>
          { popup 
            ? <CreateNewUser
                toggle={() => this.togglePop()}
                groupID={groupID}
              /> 
            : null
          }
          { popupAdd 
            ? <AddUserToGroup 
                toggle={() => this.togglePopAdd()} 
                addUser={(u, g) => this.addUserToGroup(u, g)}
                groupID={groupID}
              /> 
            : null
          }
        </div>
        <div className='users__list'>
          <div className='users__list-exp'>
            <div className='users__list-exp__fullname'>Fullname</div>
            <div className='users__list-exp__email'>E-MAIL</div>
            <div className='users__list-exp__id'>ID</div>
            <div className='users__list-exp__actions'>Actions</div>
          </div>
          <div className='users__content'>{_users}</div>
        </div>
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { 
    deleteUser,
    unmergeUserGroup 
  }
)(Users);