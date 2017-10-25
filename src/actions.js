export const addNewUser = (author) => {
	return {
		type: 'ADD_NEW_USER', 
		author
	}
}

export const addNewTask = (columnId, title, description) => {
	return {
		type: 'ADD_NEW_TASK', 
		columnId, title, description
	}
}

export const editTask = (columnId, indexTask, taskTitle, taskDescription, taskComments ) => {
	return {
		type: 'EDIT_TASK',
		columnId, indexTask, taskTitle, taskDescription, taskComments
	}
}

export const changeTitleTask = (newTitle) => {
	return {
		type: 'EDIT_TITLE_TASK',
		newTitle
	}
}

export const changeDescriptionTask = (newDescription) => {
	return {
		type: 'EDIT_DESCRIPTION_TASK',
		newDescription
	}
}

export const deleteTask = (columnId, indexTask) => {
	return {
		type: 'DELETE_TASK', 
		columnId, indexTask
	}
}

export const addComment = (text) => {
	return {
		type: 'ADD_COMMENT', 
		text
	}
}

export const editComment = (indexComment, text) => {
	return {
		type: 'EDIT_COMMENT', 
		indexComment, text
	}
}

export const deleteComment = (indexComment) => {
	return {
		type: 'DELETE_COMMENT', 
		indexComment
	}
}

export const newTaskPopup = (columnId) => {
	return {
		type: 'NEW_TASK_POPUP',
		columnId
	}
}

export const detailTaskPopup = (columnId, columnTitle, indexTask, task) => {
	return {
		type: 'DETAIL_TASK_POPUP',
		columnId, columnTitle, indexTask, task
	}
}

export const newTitleColumnPopup = (columnId, prevTitle) => {
	return {
		type: 'NEW_TITLE_COLUMN_POPUP',
		columnId, prevTitle
	}
}

export const closePopup = (id) => {
	return {
		type: 'CLOSE_POPUP',
		id
	}
}

export const setNewTitleColumn = (columnId, prevTitle, newTitle) => {
	return {
		type: 'SET_NEW_TITLE_COLUMN',
		columnId, prevTitle, newTitle
	}
}