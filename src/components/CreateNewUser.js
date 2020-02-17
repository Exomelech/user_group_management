import Select from 'react-select';
import { connect } from "react-redux";
import { createUser } from '../redux/actions';

class CreateNewUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: [],
      mailPattern: "^[A-z0-9._-]+@[a-zA-Z0-9.-]+\.[A-z]{2,4}$",
      pattern: "^[A-Z][A-z]{1,}$",
      firstname: '',
      lastname: '',
      email: '',
      groupsToAdd: null
    };
  };

  componentDidMount(){
    const {groups} = this.props;
    const options = [];
    for( let [_,el] of Object.entries(groups) ){
      options.push({
        value: el.id,
        label: el.title
      });
    };
    this.setState({
      options
    });
  };

  handleChange(groupsToAdd){
    this.setState({ groupsToAdd });
  };

  handleClick(){
    this.props.toggle();
  };

  firstnameHandle(e){
    this.setState({
      firstname: e.target.value
    });
  };
  lastnameHandle(e){
    this.setState({
      lastname: e.target.value
    });
  };
  emailHandle(e){
    this.setState({
      email: e.target.value
    });
  };

  submit(){
    let {firstname, lastname, email, groupsToAdd, pattern, mailPattern} = this.state;
    const groups = {};
    const reg = new RegExp(pattern);
    const regMail = new RegExp(mailPattern);
    if( reg.test(firstname) && reg.test(lastname) && regMail.test(email) ){
      const { groupID } = this.props;
      if( groupID ){
        groups[groupID] = groupID;
      }else{
        if( groupsToAdd!==null ){
          groupsToAdd.map( el => {
            const id = Number(el.value);
            groups[id] = id;
          }); 
        };
      };
      this.props.createUser({firstname, lastname, email, groups});
      this.props.toggle();
    };
  };

  render(){

    const { groupsToAdd, options, pattern, mailPattern } = this.state;
    const { groupID } = this.props;

    return(
      <div className="window">
        <div className='window__content'>
        <span className="window__close" onClick={this.props.toggle}>
          &times;
        </span>
        <form className='window__form'>
          <h2>New user creation window</h2>
          <div className='window__users-box'>
            <input 
              className='window__input' 
              type="text" 
              placeholder="First name" 
              onChange={e => this.firstnameHandle(e)} 
              required pattern={pattern}
            />
            <input 
              className='window__input' 
              type="text" 
              placeholder="Last name" 
              onChange={e => this.lastnameHandle(e)} 
              required pattern={pattern}
            />
            <input 
              className='window__input' 
              type="text" 
              placeholder="Email" 
              onChange={e => this.emailHandle(e)} 
              required pattern={mailPattern}
            />
            { groupID ? null : <Select
              value={groupsToAdd}
              onChange={(groups) => this.handleChange(groups)}
              options={options}
              placeholder='User groups'
              isMulti={true}
              isSearchable={false}
            /> }
          </div>
          <button 
            className='window__button'  
            type="submit" 
            onClick={() => this.submit()}
          >Create user</button>
        </form>
      </div>
    </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups
  };
};

export default connect(
  mapStateToProps,
  { 
    createUser
  }
)(CreateNewUser);