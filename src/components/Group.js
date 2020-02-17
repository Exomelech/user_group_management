import Users from './Users';
import { connect } from "react-redux";

class Group extends React.Component {

  constructor(props) {
    super(props);
    const { params } = props.match
    this.state = {
      data: props.groups[Number(params.id)]
    };
  };

  render(){
    const {data} = this.state;
    return(
      <div className='group'>
        <div className='list__header'>
          <div className='list__header-controls'>
          </div>
          <h1 className='list__title-group'>{data.title} group info</h1>
          <div className='list__search'></div>
        </div>
        <Users 
          groupID={data.id}
        />
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
  mapStateToProps
)(Group);