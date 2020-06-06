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
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.destroy_all = destroy_all;