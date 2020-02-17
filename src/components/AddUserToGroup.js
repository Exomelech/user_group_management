import Select from 'react-select';
import { connect } from "react-redux";
import { mergeUserGroup } from '../redux/actions';

class AddUserToGroup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: [],
      user: null
    };
  };

  componentDidMount(){
    const {users, groupID} = this.props;
    const options = [];
    for( let [id, el] of Object.entries( users ) ){
      if( !el.groups[groupID] ){
        options.push({
          value: id,
          label: `${el.firstname} ${el.lastname}`
        });
      };
    };
    this.setState({ options });
  };

  handleChange(user){
    this.setState({ user });
  };

  submit(){
    const { user } = this.state;
    if( user !== null ){
      this.props.mergeUserGroup({
        userid: Number(user.value),
        groupid: this.props.groupID
      })
      this.props.toggle();
    };
  };

  render(){

    const {user, options} = this.state;

    return(
      <div className="window">
        <div className='window__content'>
          <span className="window__close" onClick={this.props.toggle}>
            &times;
          </span>
          <form className='window__form'>
            <h2>Add existing user to group window</h2>
            <Select
              value={user}
              onChange={(user) => this.handleChange(user)}
              options={options}
              placeholder='Users'
              isMulti={false}
              isSearchable={true}
            />
            <button 
              className='window__button'  
              type="submit" 
              onClick={() => this.submit()}
            >Add user</button>
          </form>
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
    mergeUserGroup
  }
)(AddUserToGroup);