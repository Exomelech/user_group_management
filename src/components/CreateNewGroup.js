import { connect } from "react-redux";
import { createGroup } from '../redux/actions';

class CreateNewGroup extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      pattern: '^[A-z0-9_+#-]{3,}$',
      title: '',
      groupsTitles: this.getExistingTitles(),
      error: false
    };
  };

  getExistingTitles(){
    const { groups } = this.props;
    const groupsTitles = [];
    for( let[_, el] of Object.entries(groups)){
      groupsTitles.push(el.title);
    };
    return groupsTitles;
  };

  handleInputChange(title){
    this.setState({
      error: false,
      title
    });
  };

  submit(){
    const {title, pattern, groupsTitles} = this.state;
    const regex = new RegExp(pattern);
    if( regex.test(title) ){
      if( !groupsTitles.includes(title) ){
        this.props.createGroup({ title });
        this.props.toggle();
      }else{
        this.setState({
          error: true
        });
      };
    };
  };

  render(){
    const {title, pattern, error} = this.state;
    return(
      <div className='window'>
        <div className='window__content'>
          <span className="window__close" onClick={this.props.toggle}>
            &times;
          </span>
          <form className='window__form'>
            <h2>New group creation window</h2>
            <input 
              value={title}
              className='window__input' 
              type="text" 
              placeholder="New group name" 
              onChange={e => this.handleInputChange(e.target.value)} 
              required pattern={pattern}
            />
            <button 
              className='window__button' 
              type="submit" 
              onClick={() => this.submit()}
            >Create group</button>
            { error ? <div className='window__group-error'>Group with such title already exist!</div> : null }
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
  { createGroup }
)(CreateNewGroup);