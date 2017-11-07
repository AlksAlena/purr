import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { detailTaskPopup } from '../reducers/popups';
import PropTypes from 'prop-types'; 
import DetailTaskPopup from './DetailTaskPopup.jsx';

const propTypes = {
  indexTask: PropTypes.number.isRequired,
  task: PropTypes.object.isRequired,
  columnTitle: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

class Task extends Component {
  constructor(props) {
    super(props);
    this.handleDetailPopup = this.handleDetailPopup.bind(this);
  }

  handleDetailPopup() {
    this.props.detailTaskPopup(
      this.props.columnId, 
      this.props.columnTitle, 
      this.props.indexTask, 
      this.props.task
    );
  }

  render() {
    const divStyle = {
      backgroundColor: 'rgba(32, 178, 170, 0.5)'
    };

    const { indexTask } = this.props;
    const { title, comments } = this.props.task;

    return (
      <div>
        <div className="task" onClick={this.handleDetailPopup} >
          <p className="task-title">
              {title}
            <i className="icon-comment-empty" title="comments"> {comments.length}</i>
          </p>
        </div>
        { this.props.popups.detailPopup.show && <DetailTaskPopup /> }
      </div>
    );    
  }
}

Task.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    popups: state.popupsReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    detailTaskPopup
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Task)