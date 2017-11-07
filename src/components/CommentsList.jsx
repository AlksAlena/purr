import React, { Component } from 'react';

import Comment from './Comment.jsx';

export default class CommentsList extends Component {
  render() {    
    return( 
      <div className="comments">
        {this.props.comments.map((comment, index) => {
          return (
            <Comment 
              key={index} 
              indexComment={index} 
              comment={comment} 
              handleIsEdited={this.props.handleIsEdited} 
              handleSaveButton={this.props.handleSaveButton}
            />
          );
        })}
      </div>
    );
  }
}