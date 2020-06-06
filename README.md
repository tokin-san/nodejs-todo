# nodejs-todo

This is sample project for my training.


## How to start


### 1. install projects 

```shell script
git clone https://github.com/tokin-san/nodejs-todo.git
cd nodejs-todo
npm install
```

### 2. modify environment file 

```
cp .env.example .env
vi .env
``` 

### 3. launch

on Linux
```
DEBUG=myapp:* npm start
```


on Windows
```
SET DEBUG=nodejs-todo:* & npm start
```


### 4. Finish

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


## Notes

- When generate hash from plain token string, you can use `node commands/hash.js <plain token string>` .
