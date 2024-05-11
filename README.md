# FastAPI BE and React FE CRUD Application

## Directory structure

```
./
├── client
├── server
```

## Getting started with Client

1. Go to the [Client](./client) folder
2. Run the following command:

```
$ npm install
```

3. Start the application with the following command:

```
$ npm run start
```

4. Run the tests with the following command:

```
$ npm run test
```

## Getting started with Server

1. Go to the [Server](./server) folder
2. Create a virtual environment and activate it with the following command:

```
$ python3 -m venv env
$ source env/bin/activate
```

3. Install the required packages with the following command:

```
$ pip install -r requirements.txt
```

3. Start the application with the following command:

```
$ uvicorn  main:app --reload
```

4. Open the documentation by visiting [http://localhost:8000/docs#/](http://localhost:8000/docs#/)

5. Run the tests with the following command:

```
$ python -m pytest
```
