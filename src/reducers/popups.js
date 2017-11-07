export const NEW_TASK_POPUP = 'NEW_TASK_POPUP',
  DETAIL_TASK_POPUP = 'DETAIL_TASK_POPUP',
  NEW_TITLE_COLUMN_POPUP = 'NEW_TITLE_COLUMN_POPUP',
  EDIT_TITLE_TASK = 'EDIT_TITLE_TASK',
  EDIT_DESCRIPTION_TASK = 'EDIT_DESCRIPTION_TASK',
  ADD_COMMENT = 'ADD_COMMENT',
  EDIT_COMMENT = 'EDIT_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  CLOSE_POPUP = 'CLOSE_POPUP';

export const changeTitleTask = (newTitle) => (dispatch) => {
  dispatch({
    type: EDIT_TITLE_TASK,
    newTitle
  });
};

export const changeDescriptionTask = (newDescription) => (dispatch) => {
  dispatch({
    type: EDIT_DESCRIPTION_TASK,
    newDescription
  });
};

export const addComment = (text) => (dispatch) => {
  dispatch({
    type: ADD_COMMENT, 
    text
  });
};

export const editComment = (indexComment, text) => (dispatch) => {
  dispatch({
    type: EDIT_COMMENT, 
    indexComment, 
    text
  });
};

export const deleteComment = (indexComment) => (dispatch) => {
  dispatch({
    type: DELETE_COMMENT, 
    indexComment
  });
};

export const newTaskPopup = (columnId) => (dispatch) => {
  dispatch({
    type: NEW_TASK_POPUP,
    columnId
  });
};

export const detailTaskPopup = (columnId, columnTitle, indexTask, task) => (dispatch) => {
  dispatch({
    type: DETAIL_TASK_POPUP,
    columnId, 
    columnTitle, 
    indexTask, 
    task
  });
};

export const newTitleColumnPopup = (columnId, prevTitle) => (dispatch) => {
  dispatch({
    type: NEW_TITLE_COLUMN_POPUP,
    columnId, 
    prevTitle
  });
};

export const closePopup = (id) => (dispatch) => {
  dispatch({
    type: CLOSE_POPUP,
    id
  });
};

const ACTION_HANDLERS = {
  [NEW_TASK_POPUP]: (state, action) => {
    const tmpNewTaskPopup = {
      show: true,
      column: action.columnId
    };
    return ({
      ...state,
      newTaskPopup: tmpNewTaskPopup
    })
  },
  [DETAIL_TASK_POPUP]: (state, action) => {
    const tmpComments = action.task.comments.map((comment, index) => {
      return {
        text: comment.text,
        author: comment.author,
        date: comment.date
      }
    });
    const tmpDetailPopup = {
      show: true,
      task: {
        indexTask: action.indexTask, 
        title: action.task.title, 
        description: action.task.description, 
        comments: tmpComments, 
        author: action.task.author, 
        columnTitle: action.columnTitle, 
        columnId: action.columnId
      }
    };
    return ({
      ...state,
      detailPopup: tmpDetailPopup,
    })
  },
  [NEW_TITLE_COLUMN_POPUP]: (state, action) => {
    console.log(action)
    const tmpNewTitleColumnPopup = {
      show: true,
      column: action.columnId,
      prevTitle: action.prevTitle
    };
    console.log(tmpNewTitleColumnPopup)
    return ({
      ...state,
      newTitleColumnPopup: tmpNewTitleColumnPopup
    })
  },
  [EDIT_TITLE_TASK]: (state, action) => {
    state.detailPopup.task.title = action.newTitle;
    return ({
      ...state,
    })
  },
  [EDIT_DESCRIPTION_TASK]: (state, action) => {
    state.detailPopup.task.description = action.newDescription;
    return ({
      ...state,
    })
  },
  [ADD_COMMENT]: (state, action) => {
    let today = new Date();
      let now = today.getDate() + "-" + (today.getMonth() + 1) + 
        "-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();

    state.detailPopup.task.comments.unshift({
      text: action.text,
      author: state.detailPopup.task.author,
      date: now
    });
    return ({
      ...state,
    })
  },
  [EDIT_COMMENT]: (state, action) => {
    const updateComment = {
      text: action.text,
      author: state.detailPopup.task.author,
      date: state.detailPopup.task.date
    };
    state.detailPopup.task.comments.splice(action.indexComment, 1, updateComment);
    return ({
      ...state,
    })
  },
  [DELETE_COMMENT]: (state, action) => {
    state.detailPopup.task.comments.splice(action.indexComment, 1);
    return ({
      ...state,
    })
  },
  [CLOSE_POPUP]: (state, action) => {
    const hidden = {
      show: false
    };
    return ({
      ...state,
      [`${action.id}Popup`]: hidden
    })
  },
};

const initialState = {
  newTaskPopup: {
    show: false,
    column: ''
  }, 
  detailPopup: {
    show: false,
    task: {
      indexTask: '', 
      title: '', 
      description: '', 
      comments: [], 
      author: '', 
      columnTitle: '', 
      columnId: ''
    }   
  }, 
  newTitleColumnPopup: {
    show: false,
    column: '',
    prevTitle: ''
  }, 
  newUserPopup: {
    show: true
  }
};

export const popupsReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
