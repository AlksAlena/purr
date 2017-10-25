import { combineReducers } from "redux";

let deskState = { 
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
if(localStorage.getItem("deskState")) {
	let commonState = JSON.parse(localStorage.getItem("deskState"));
	deskState = commonState.columnsReducer; 
}

const columnsReducer = (state = deskState, action) => {
	let currentState = Object.assign({}, state);

	switch (action.type) {
		case 'ADD_NEW_USER':
			currentState.author = action.author;
			return currentState;

		case 'ADD_NEW_TASK':
			currentState[action.columnId] = currentState[action.columnId].concat({
				title: action.title,
				description: action.description,
				comments: [],
				author: currentState.author
			});
			return currentState;

		case 'EDIT_TASK':
			let updateTask = {
				title: action.taskTitle,
				description: action.taskDescription,
				comments: action.taskComments,
				author: currentState.author
			};
			currentState[action.columnId].splice(action.indexTask, 1, updateTask);
			
			return currentState;
		
		case 'DELETE_TASK':
			currentState[action.columnId].splice(action.indexTask, 1);
			return currentState;

		case 'SET_NEW_TITLE_COLUMN':
			if(action.newTitle) currentState[`${action.columnId}Title`] = action.newTitle;
			return currentState;

		default:
			return state
	}
};

const popupsState = {
	newTaskPopup: {
		show: false,
		column: ''
	}, 
	detailPopup: {
		show: false,
		task: {
			index: '',
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

const popupsReducer = (state = popupsState, action) => {
	let currentState = Object.assign({}, state);
	switch (action.type) {

		case 'NEW_TASK_POPUP':
			currentState.newTaskPopup.show = true;
			currentState.newTaskPopup.column = action.columnId;
			return currentState;

		case 'DETAIL_TASK_POPUP':
			let tmpComments = action.task.comments.map((comment, index) => {
				return {
					text: comment.text,
					author: comment.author,
					date: comment.date
				}
			});
			currentState.detailPopup.show = true;
			currentState.detailPopup.task = {
				indexTask: action.indexTask,
				title: action.task.title,
				description: action.task.description,
				comments: tmpComments,
				author: action.task.author,
				columnTitle: action.columnTitle,
				columnId: action.columnId
			}
			return currentState;

		case 'NEW_TITLE_COLUMN_POPUP':
			currentState.newTitleColumnPopup.show = true;
			currentState.newTitleColumnPopup.column = action.columnId;
			currentState.newTitleColumnPopup.prevTitle = action.prevTitle;
			return currentState;

		case 'EDIT_TITLE_TASK':
			currentState.detailPopup.task.title = action.newTitle;
			return currentState;

		case 'EDIT_DESCRIPTION_TASK':
			currentState.detailPopup.task.description = action.newDescription;
			return currentState;

		case 'ADD_COMMENT':
			let today = new Date();
			let now = today.getDate() + "-" + (today.getMonth() + 1) + 
				"-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();

			currentState.detailPopup.task.comments.unshift({
				text: action.text,
				author: currentState.detailPopup.task.author,
				date: now
			});
			return currentState;

		case 'EDIT_COMMENT':
			let updateComment = {
				text: action.text,
				author: currentState.detailPopup.task.comments[action.indexComment].author,
				date: currentState.detailPopup.task.comments[action.indexComment].date
			};
			currentState.detailPopup.task.comments.splice(action.indexComment, 1, updateComment);
			return currentState;

		case 'DELETE_COMMENT':
			currentState.detailPopup.task.comments.splice(action.indexComment, 1);
			return currentState;

		case 'CLOSE_POPUP':
			currentState[`${action.id}Popup`].show = false;
			return currentState;

		default:
			return state
	}
}

export default combineReducers({
	columnsReducer,
	popupsReducer
});