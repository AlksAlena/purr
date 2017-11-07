export const ADD_NEW_USER = 'ADD_NEW_USER',
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  EDIT_TASK = 'EDIT_TASK',
  DELETE_TASK = 'DELETE_TASK',
  SET_NEW_TITLE_COLUMN = 'SET_NEW_TITLE_COLUMN';

export const addNewUser = (author) => (dispatch) => {
  dispatch({
    type: ADD_NEW_USER, 
    author
  });
};

export const addNewTask = (columnId, title, description) => (dispatch) => {
  dispatch({
    type: ADD_NEW_TASK, 
    columnId, 
    title, 
    description
  });
};

export const editTask = (columnId, indexTask, taskTitle, taskDescription, taskComments ) => (dispatch) => {
  dispatch({
    type: EDIT_TASK,
    columnId, 
    indexTask, 
    taskTitle, 
    taskDescription, 
    taskComments
  });
};

export const deleteTask = (columnId, indexTask) => (dispatch) => {
  dispatch({
    type: DELETE_TASK, 
    columnId, 
    indexTask
  });
};

export const setNewTitleColumn = (columnId, prevTitle, newTitle) => (dispatch) => {
  dispatch({
    type: SET_NEW_TITLE_COLUMN,
    columnId, 
    prevTitle, 
    newTitle
  });
};

const ACTION_HANDLERS = {
  [ADD_NEW_USER]: (state, action) => ({
    ...state, 
    author: action.author
  }),
  [ADD_NEW_TASK]: (state, action) => {
    const column = `${action.columnId}`;
    const tasksList = state[column].concat({
      title: action.title,
      description: action.description,
      comments: [],
      author: state.author
    });
    return ({
      ...state,
      [column]: tasksList
    })
  },
  [EDIT_TASK]: (state, action) => {
    const column = `${action.columnId}`;
    const updateTask = {
      title: action.taskTitle,
      description: action.taskDescription,
      comments: action.taskComments,
      author: state.author
    };
    const tasksList = [...state[column]];
    tasksList.splice(action.indexTask, 1, updateTask);
    return ({
      ...state,
      [column]: tasksList
    })
  },
  [DELETE_TASK]: (state, action) => {
    const column = `${action.columnId}`;
    const tasksList = [...state[column]];
    tasksList.splice(action.indexTask, 1);
    return ({
      ...state,
      [column]: tasksList
    })
  },
  [SET_NEW_TITLE_COLUMN]: (state, action) => {
    if (action.newTitle) {
      return ({
        ...state,
        [`${action.columnId}Title`]: action.newTitle
      });
    } else return ({ ...state })
  },
};

let initialState = { 
  author: '', 
  todoTitle: 'TODO',
  progressTitle: 'In Progress',
  testTitle: 'Testing',
  doneTitle: 'Done',
  todo: [], 
  progress: [], 
  test: [], 
  done: []
};

if(localStorage.getItem('deskState')) {
  let commonState = JSON.parse(localStorage.getItem('deskState'));
  initialState = commonState.columnsReducer; 
}

export const columnsReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};