import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newTitleColumnPopup, newTaskPopup } from '../reducers/popups';

import PropTypes from 'prop-types'; 

import TasksList from './TasksList.jsx';
import NewTaskPopup from './NewTaskPopup.jsx';
import NewTitleColumnPopup from './NewTitleColumnPopup.jsx';

const propTypes = {
  id: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired
};

class Column extends Component {
  constructor(props) {
    super(props);   
    this.handleNewTitle = this.handleNewTitle.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
  }

  handleNewTitle() {
    this.props.newTitleColumnPopup(this.props.id, this.props.columns[`${this.props.id}Title`]);
  }

  handleAddButton() {
    this.props.newTaskPopup(this.props.id);
  }

  render() {
    const { columns, id, tasks } = this.props;

    return (
      <div className="col-sm-6 col-md-3 column">
        <h2 className="column-title">{columns[`${this.props.id}Title`]}
          <i className="icon-pencil" title="edit title" onClick={this.handleNewTitle}></i>
        </h2>
        <TasksList columnId={id} tasks={tasks} columnTitle={columns[`${this.props.id}Title`]} />
        <button 
          className="column-button__add" 
          type="submit" 
          value="Add" 
          onClick={this.handleAddButton}
        >
          <i className="icon-doc-add" title="add task" ></i>
        </button> 

        { this.props.popups.newTaskPopup.show && <NewTaskPopup /> }

        { this.props.popups.newTitleColumnPopup.show && <NewTitleColumnPopup />}
      </div>
    );
  }
}

Column.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    columns: state.columnsReducer,
    popups: state.popupsReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newTitleColumnPopup,
    newTaskPopup
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Column)