const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('storage/db.json');
const db = low(adapter);

db.defaults({ users: [] })
    .write();

/**
 * ユーザーの作成
 * @param {string] name
 * @return {boolean} 結果
 */
function create(name) {
    const latest_user = find_latest();
    var user_id = 1;
    if (latest_user) {
        user_id = latest_user.id + 1;
    }

    db.get('users')
        .push({ id: user_id, name: name })
        .write();
    return true;
}

/**
 * 全ユーザーの取得
 * @param {Object[]} JSONオブジェクト配列
 */
function find_all() {
    return db.get('users').sortBy('id').value() || [];
}

/**
 * ID指定でユーザーを取得する
 * @param {number} user_id
 * @param {Object} JSONオブジェクト
 */
function find_by_id(user_id) {
    return db.get('users')
        .find({ id: user_id })
        .value() || {};
}

/**
 * ユーザーID指定でToDoリストを取得する
 * @param {number} user_id
 * @param {Object} JSONオブジェクト
 */
function find_by_id_todo(uid) {
    return db.get('todos')
		.filter({ user_id: uid })
		.value() || {};
}

/**
 * ユーザーID指定でToDoリストを取得する
 * @param {number} user_id
 * @param {Object} JSONオブジェクト
 */
function find_by_id_todo_filter(uid) {
    return db.get('todos')
		.filter({ user_id: uid, is_closed: false })
		.value() || {};
}

/**
 * ToDoID指定でToDoを取得する
 * @param {number} id - ToDoID
 * @param {Object} JSONオブジェクト
 */
function find_by_id_todoid(tid, uid) {
    return db.get('todos')
		.filter({ id: tid, user_id: uid})
		.value() || {};
}

/**
 * 最新のユーザーを取得する
 * @return {Object} JSONオブジェクト
 */
function find_latest() {
    return db.get('users')
        .sortBy('id')
        .last()
        .value() || {};
}

/**
 * ユーザーの情報を更新する
 * @param {number} user_id - 上書き対象のID
 * @param {Object} value - 上書きする値
 * @return {boolean} result
 */
function update(user_id, value) {
    db.get('users')
      .find({ id: user_id })
      .assign(value)
      .write();
    return true;
}

/**
 * ToDoの情報を更新する
 * @param {number} id - 上書き対象ToDoのID
 * @param {number} uid - 上書き対象のユーザーID
 * @param {Object} value - 上書きする値
 * @return {boolean} result
 */
function updatetodo(id, uid, value) {
    db.get('todos')
      .find({ id: id, user_id: uid})
	  .assign(value)
      .write();
    return true;
}

/**
 * ユーザーを削除する
 * @param {number} user_id
 * @return {boolean} result
 */
function remove(user_id) {
    db.get('users')
        .remove({ id: user_id })
        .write();
    return true;
}

/**
 * ToDoを削除する
 * @param {number} id
 * @param {number} user_id
 * @return {boolean} result
 */
function remove_todo(id, user_id) {
    db.get('todos')
        .remove({ id: id, user_id: user_id })
        .write();
    return true;
}

/**
 * ToDoの作成
 * @param {number} user_id
 * @param {string} title
 * @param {string} description
 */
function create_todo(uid, subject, descrip) {
	const latest_todo = find_latest_todo();
	var tid = 1;
	var uid = parseInt(uid);

	if(latest_todo) {
		tid = latest_todo.id + 1;
	}

	db.get('todos')
	.push({ id: tid, user_id: uid, title: subject, description: descrip, is_closed: false})
	.write();
	return true;
}

/**
 * 最新のToDoを取得する
 * @return {Object} JSONオブジェクト
 */
function find_latest_todo() {
    return db.get('todos')
        .sortBy('id')
        .last()
        .value() || {};
}

module.exports.create = create;
module.exports.create_todo = create_todo;
module.exports.find_all = find_all;
module.exports.find_by_id = find_by_id;
module.exports.find_by_id_todo = find_by_id_todo;
module.exports.find_by_id_todo_filter = find_by_id_todo_filter;
module.exports.find_by_id_todoid = find_by_id_todoid;
module.exports.find_latest = find_latest;
module.exports.find_latest_todo = find_latest_todo;
module.exports.update = update;
module.exports.updatetodo = updatetodo;
module.exports.remove = remove;
module.exports.remove_todo = remove_todo;