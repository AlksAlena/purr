import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePopup } from '../reducers/popups';
import { addNewTask } from '../reducers/columns';

class NewTaskPopup extends Component {
  constructor(props) {
    super(props);
    this.handleButtonEscape = this.handleButtonEscape.bind(this);
    this.handleSetTitle = this.handleSetTitle.bind(this);
    this.handleSetDescription = this.handleSetDescription.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      taskTitle: '',
      taskDescription: ''
    };
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleButtonEscape);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleButtonEscape);
  }

  handleClosePopup() {
    this.props.closePopup(this.props.id);
  }

  handleButtonEscape() {
    if (event.keyCode == 27) {
      this.props.closePopup(this.props.id);
    }
  }

  handleSetTitle(event) {
    this.setState({taskTitle: event.target.value});
  }

  handleSetDescription(event) {
    this.setState({taskDescription: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNewTask(
      this.props.popups.newTaskPopup.column, 
      this.state.taskTitle, 
      this.state.taskDescription
    );
    this.setState({
      taskTitle: '',
      taskDescription: ''
    });
    this.props.closePopup(this.props.id);
  }

  render() {
    return (
      <div className="newTaskPopup">
        <div className="overlay"></div>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <a href="#" className="btn__close" title="close" onClick={this.handleClosePopup}>
              <i className="icon-cancel"></i>
            </a>

            <h2>Create a new task</h2>
            <label>Enter title of task</label>
            <input 
              type="text" 
              value={this.state.taskTitle} 
              onChange={this.handleSetTitle} 
              autoFocus 
              required 
            />
            
            <label>Enter description</label>
            <textarea 
              rows="3" 
              value={this.state.taskDescription} 
              onChange={this.handleSetDescription}
            ></textarea>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    popups: state.popupsReducer,
    id: 'newTask'
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addNewTask,
    closePopup
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskPopup)