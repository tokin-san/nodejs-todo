const repository = require('./../repositories/user_repository');

/**
 * ユーザー一覧
 * @param {Object} query - リクエストクエリオブジェクト
 * @return {Object} JSONオブジェクト
 */
function index(query) {
    const user_id = query.q
    if (user_id) {
        return repository.find_by_id(parseInt(user_id));
    } else {
        return repository.find_all();
    }
}

/**
 * ToDo一覧
 * @param {string} uid - ユーザーID
 * @return {Object} JSONオブジェクト
 */
function todolist(uid) {
	const user_id = uid
	
	const array1 = repository.find_by_id_todo(parseInt(user_id));
	const mappedArray = array1.map((object) => {
		const id = object.id;
		const title = object.title;
		const is_closed = object.is_closed;
		return {id, title, is_closed};
	});
	
	return mappedArray;
}

/**
 * ToDo一覧(絞込)
 * @param {string} uid - ユーザーID
 * @return {Object} JSONオブジェクト
 */
function todo_filter(uid, oopen) {
	const onlyopen = parseInt(oopen)
	if(onlyopen == 1) {
		const array1 = repository.find_by_id_todo_filter(parseInt(uid));
		const mappedArray = array1.map((object) => {
			const id = object.id;
			const title = object.title;
			const is_closed = object.is_closed;
			return {id, title, is_closed};
		});
		return mappedArray;
	} else {
		const array2 = repository.find_by_id_todo(parseInt(uid));
		const mappedArray2 = array2.map((object) => {
			const id = object.id;
			const title = object.title;
			const is_closed = object.is_closed;
			return {id, title, is_closed};
		});
		return mappedArray2;
	}
}

/**
 * ToDo詳細
 * @param {string} id - ToDoID
 * @param {string} uid - ユーザーID
 * @return {Object} JSONオブジェクト
 */
function todo_detail(id, uid) {
	const obj = repository.find_by_id_todoid(parseInt(id), parseInt(uid))
	if(!id) {
		return { status: false, message: 'ToDoIDを指定してください。' };
	} else if(!uid) {
		return { status: false, message: 'ユーザーIDを指定してください。' };
	} else if(Object.keys(obj).length == 0) {
		return { status: false, message: '該当するToDoが存在しません。' };
	} else {
		return repository.find_by_id_todoid(parseInt(id), parseInt(uid));
	}
}

/**
 * ToDo登録
 * @param {Object} body - リクエストクエリオブジェクト
 * @return {Object} JSONオブジェクト
 */
function storetodo(userid, body) {
	const uid = body.user_id;
	const title = body.title;
	const descrip = body.description;
	if(!uid) {
		return { status: false, message: 'ユーザーIDを指定してください。' };
	} else if(!title) {
		return { status: false, message: 'ToDoタイトルを指定してください。' };
	} else if(!descrip) {
		return { status: false, message: 'ToDoの中身を指定してください。' };
	} else {
		repository.create_todo(uid, title, descrip);
		
		return { status: true, message: null };
	}
}

/**
 * ユーザー登録
 * @param {Object} body - リクエストボディオブジェクト
 * @return {Object} JSONオブジェクト
 */
function store(body) {
    const name = body.name;
    if (!name) {
        return { status: false, message: '名前を指定してください。' };
    }

    repository.create(name);

    return { status: true, message: null };
}

/**
 * ToDo更新
 * @param {string} id - リソースID
 * @param {string} user_id - ユーザーID
 * @param {Object} body - リクエストボディオブジェクト
 * @return {Object} JSONオブジェクト
 */
function updatetodo(id, user_id, body) {
    const title = body.title;
	const desc = body.description;
	const isc = body.is_closed;
	const obj_id = repository.find_by_id_todoid(parseInt(id), parseInt(user_id));
	const obj_uid = repository.find_by_id(parseInt(user_id));
	if (!title) {
        return { status: false, message: 'タイトルを指定してください。' };
    } else if (!desc) {
        return { status: false, message: '内容を指定してください。' };
    } else if(!isc) {
		return { status: false, message: '終了状態を指定してください。' };
	} else if (Object.keys(obj_uid).length == 0) {
		return { status: false, message: '該当するユーザーが存在しません。' };
	} else if (Object.keys(obj_id).length == 0) {
        return { status: false, message: '該当するToDoが存在しません。' };
    } else {
		const new_value = { title: title, description: desc, is_closed: isc };
		repository.updatetodo(parseInt(id), parseInt(user_id), new_value);
	}
	return { status: true, message: null };
}

/**
 * ユーザー更新
 * @param {string} id - リソースID
 * @param {Object} body - リクエストボディオブジェクト
 * @return {Object} JSONオブジェクト
 */
function update(id, body) {
    const name = body.name;
    if (!name) {
        return { status: false, message: '名前を指定してください。' };
    }

    const new_value = { name: name };
    repository.update(parseInt(id), new_value);

    return { status: true, message: null };
}

/**
 * ユーザー削除
 * @param {string} id - ユーザーID
 * @return {Object} JSONオブジェクト
 */
function destroy(id) {
    const user_id = id;
    if (!user_id) {
        return { status: false, message: 'IDを指定してください。' }; 
    }

    repository.remove(parseInt(user_id));

    return { status: true, message: null };
}

/**
 * ToDo削除
 * @param {string} id - ToDoID
 * @param {string} uid - ユーザーID
 * @return {Object} JSONオブジェクト
 */
function destroy_todo(id, uid) {
	const obj = repository.find_by_id_todoid(parseInt(id), parseInt(uid));
    if (!id) {
        return { status: false, message: 'ToDoIDを指定してください。' }; 
    } else if (!uid) {
		return { status: false, message: 'ユーザーIDを指定してください。' }; 
	} else if(Object.keys(obj).length == 0) {
		return { status: false, message: '該当するToDoが存在しません。' }; 
	} else {
		
		repository.remove_todo(parseInt(id), parseInt(uid));

	}
    return { status: true, message: null };
	
}

/**
 * ユーザー全削除
 * @return {Object} JSONオブジェクト
 */
 function destroy_all() {
	const userdata = repository.find_all();
	userdata.forEach(user => {
		repository.remove(parseInt(user.id));
	})		

	return { status: true, message: null };
 }
 
module.exports.index = index;
module.exports.store = store;
module.exports.storetodo = storetodo;
module.exports.todolist = todolist;
module.exports.todo_filter = todo_filter;
module.exports.todo_detail = todo_detail;
module.exports.update = update;
module.exports.updatetodo = updatetodo;
module.exports.destroy = destroy;
module.exports.destroy_all = destroy_all;
module.exports.destroy_todo = destroy_todo;
