# nodejs-todo

This is sample project for my training.

## How to start

```shell script
git clone https://github.com/tokin-san/nodejs-todo.git
cd nodejs-todo
npm install
SET DEBUG=nodejs-todo:* & npm start
```

Make sure you can access http://localhost:3000/

## Available URL

- GET /
- GET /api/users
- GET /api/users?q=1
- POST /api/users
    ```json
    {
        "name": "name_of_new_user"
    }
    ```
- PUT /api/users/1
    ```json
    {
        "name": "new_name"
    }
    ```
- DELETE /api/users/1
