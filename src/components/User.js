import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { mergeUserGroup, unmergeUserGroup } from '../redux/actions';

const GroupsItem = (props) => {
  return(
    <div className='user__groups-item'>
      <Link to={`/courses/${props.id}`}>{props.title}</Link>
      <button className='user__remove-group' type='submit' onClick={props.remove}>Remove group</button>
    </div>
  )
};

class User extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userid: props.match.params.id
    };
  };

  getUserInfo(){
    const { users, match } = this.props;
    return users[match.params.id];
  };

  removeGroup(id, groupid){
    this.props.unmergeUserGroup({id, groupid});
    //this.forceUpdate();
  };

  render(){

    const {userid} = this.state;
    const { groups, users } = this.props;
    const data = users[userid];
    const groupsData = [];
    for( const [_, el] of Object.entries(data.groups) ){
      const group = groups[el];
      groupsData.push({
        id: group.id,
        title: group.title
      });
    };

    return(
      <div className='user'>
        <div className='list__header'>
          <div className='list__header-controls'>
          </div>
          <h1 className='list__title'>User info</h1>
          <div className='list__search'></div>
        </div>
        <div className='user__detailed'>
          <div className='user__generalinfo'>
            <div className='user__textbox'>
              <div className='textbox__title'>ID:</div>
              <div className='textbox__content'>{data.id}</div>
            </div>
            <div className='user__textbox'>
              <div className='textbox__title'>First name:</div>
              <div className='textbox__content'>{data.firstname}</div>
            </div>
            <div className='user__textbox'>
              <div className='textbox__title'>Last name:</div>
              <div className='textbox__content'>{data.lastname}</div>
            </div>
            <div className='user__textbox'>
              <div className='textbox__title'>E-mail:</div>
              <div className='textbox__content'>{data.email}</div>
            </div>
          </div>
          <div className='user__groups'>
            <div className='user__groups-title'>User groups list</div>
            <div className='user__groups-list'>{
              groupsData.map( (el, i) => 
                <GroupsItem 
                  id={el.id} 
                  title={el.title}
                  key={el.id}
                  remove={() => this.removeGroup(userid, el.id)}
                />
              )
            }</div>
          </div>
        </div>
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    groups: state.groups
  };
};

export default connect(
  mapStateToProps,
  { mergeUserGroup, unmergeUserGroup }
)(User);