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

module.exports.create = create;
module.exports.find_all = find_all;
module.exports.find_by_id = find_by_id;
module.exports.find_latest = find_latest;
module.exports.update = update;
module.exports.remove = remove;