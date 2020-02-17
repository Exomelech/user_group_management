import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { deleteGroup } from '../redux/actions';
import CreateNewGroup from './CreateNewGroup';

const Course = (props) => {
  const {title, id, remove } = props;
  return(
    <div className='courses__list-item'>
      <div className='courses__item-title'><Link to={`/courses/${id}`}>{title}</Link></div>
      <div className='courses__item-id'>{id}</div>
      <div className='courses__item-actions'>
        <button 
          type="submit" 
          onClick={remove}
        >Remove group</button> 
      </div>
    </div>
  );
};

class Courses extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      popup: false,
    };
  };

  togglePop(){
    this.setState({
      popup: !this.state.popup
    });
  };

  render(){

    const { popup } = this.state;
    const groups = [];
    for(const [id, el] of Object.entries(this.props.groups)){
      groups.push(<Course 
        title={el.title}
        id={id}
        key={id}
        remove = {() => this.props.deleteGroup({id})}
      />);
    };

    return(
      <div className='courses'>
        <div className='list__header'>
          <div className='list__header-controls'>
            <button type='submit' onClick={() => this.togglePop()}>Add group</button>
          </div>
          <h1 className='list__title'>COURSES</h1>
          <div className='list__search'></div>
          {popup ? <CreateNewGroup 
            toggle={() => this.togglePop()}
          /> : null}
        </div>
        <div className='courses__list'>
          <div className='courses__list-exp'>
            <div className='list-exp__title'>Title</div>
            <div className='list-exp__id'>ID</div>
            <div className='list-exp__actions'>Actions</div>
          </div>
          <div className='courses__content'>{groups}</div>
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
    deleteGroup
  }
)(Courses);