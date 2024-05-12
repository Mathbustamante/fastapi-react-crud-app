from .conftest import client

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to my API!"}

def test_get_users(test_db_setup_teardown):
    response = client.get("/api/users")
    data = response.json()
    assert response.status_code == 200
    assert data["status"] == "success"
    assert len(data["users"]) == 1
    
def test_get_user(test_db_setup_teardown):
    response = client.get(f"/api/users/4d9386e1-0eb5-4938-86b1-fbd119cbef3b")
    data = response.json()
    assert response.status_code == 200
    assert data["status"] == "success"
    assert data["user"]["id"] == "4d9386e1-0eb5-4938-86b1-fbd119cbef3b"
    assert data["user"]["first_name"] == "John"
    assert data["user"]["last_name"] == "Doe"
    assert data["user"]["email"] == "johndoe@gmail.com"
    assert data["user"]["age"] == 25
    assert data["user"]["marital_status"] == "single"
    assert data["user"]["address"] == "1017 HR Rotterdam"


def test_create_user(test_db_setup_teardown):
    response = client.post("/api/users", json={
        "first_name": "Tim",
        "last_name": "Cook",
        "email": "timcook@apple.com",
        "age": 55,
        "marital_status": "single",
        "address": "1017 HR Rotterdam"
    })
    data = response.json()
    assert response.status_code == 201
    assert data["status"] == "success"
    assert data["user"]["first_name"] == "Tim"
    assert data["user"]["last_name"] == "Cook"
    assert data["user"]["email"] == "timcook@apple.com"
    assert data["user"]["age"] == 55
    assert data["user"]["marital_status"] == "single"
    assert data["user"]["address"] == "1017 HR Rotterdam"

def test_update_user(test_db_setup_teardown):
    response = client.put(f"/api/users/4d9386e1-0eb5-4938-86b1-fbd119cbef3b", json={
        "first_name": "New John",
        "last_name": "New Cook",
        "email": "newtimcook@apple.com",
        "age": 100,
        "marital_status": "married",
        "address": "1017 HR Rotterdam"
    })
    data = response.json()
    assert response.status_code == 200
    assert data["status"] == "success"
    assert data["user"]["first_name"] == "New John"
    assert data["user"]["last_name"] == "New Cook"
    assert data["user"]["email"] == "newtimcook@apple.com"
    assert data["user"]["age"] == 100
    assert data["user"]["marital_status"] == "married"
    assert data["user"]["address"] == "1017 HR Rotterdam"
    
def test_delete_user(test_db_setup_teardown):
    response = client.delete(f"/api/users/4d9386e1-0eb5-4938-86b1-fbd119cbef3b")
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "success"  
    assert data["user"]["id"] == "4d9386e1-0eb5-4938-86b1-fbd119cbef3b"
    assert data["user"]["first_name"] == "John"
    assert data["user"]["last_name"] == "Doe"
    assert data["user"]["email"] == "johndoe@gmail.com"
    assert data["user"]["age"] == 25
    assert data["user"]["marital_status"] == "single"
    assert data["user"]["address"] == "1017 HR Rotterdam"
    response.status_code == 200

    response = client.get("/api/users")
    data = response.json()
    assert len(data["users"]) == 0

def test_create_user_with_duplicate_email(test_db_setup_teardown):
    response = client.post("/api/users", json={
        "first_name": "Tim",
        "last_name": "Cook",
        "email": "johndoe@gmail.com",
        "age": 55,
        "marital_status": "single",
        "address": "1017 HR Rotterdam"
    })
    data = response.json()
    assert response.status_code == 400
    assert data["detail"] == "Email already exists"

def test_create_user_with_wrong_payload(test_db_setup_teardown):
    response = client.post("/api/users", json={})
    data = response.json()
    assert response.status_code == 422
    assert data["detail"] ==  [
            {
            "loc": [
                "body",
                "first_name"
            ],
            "msg": "field required",
            "type": "value_error.missing"
            },
            {
            "loc": [
                "body",
                "last_name"
            ],
            "msg": "field required",
            "type": "value_error.missing"
            },
            {
            "loc": [
                "body",
                "email"
            ],
            "msg": "field required",
            "type": "value_error.missing"
            },
            {
            "loc": [
                "body",
                "age"
            ],
            "msg": "field required",
            "type": "value_error.missing"
            },
            {
            "loc": [
                "body",
                "marital_status"
            ],
            "msg": "field required",
            "type": "value_error.missing"
            },
            {
            "loc": [
                "body",
                "address"
            ],
            "msg": "field required",
            "type": "value_error.missing"
            }
        ]

def test_update_user_with_duplicate_email(test_db_setup_teardown):    
    response = client.put(f"/api/users/4d9386e1-0eb5-4938-86b1-fbd119cbef3b", json={
        "first_name": "New John",
        "last_name": "New Doe",
        "email": "johndoe@gmail.com",
        "age": 100,
        "marital_status": "married",
        "address": "1017 HR Rotterdam"
    })
    assert response.status_code == 200
    
    client.post("/api/users", json={
        "first_name": "Max",
        "last_name": "Vettel",
        "email": "maxvettel@gmail.com",
        "age": 22,
        "marital_status": "single",
        "address": "1017 HR Rotterdam"
    })
    
    response = client.put(f"/api/users/4d9386e1-0eb5-4938-86b1-fbd119cbef3b", json={
        "first_name": "New John",
        "last_name": "New Doe",
        "email": "maxvettel@gmail.com",
        "age": 100,
        "marital_status": "married",
        "address": "1017 HR Rotterdam"
    })
    data = response.json()
    response.status_code == 400
    assert data["detail"] == "Email already exists"

def test_update_with_wrong_payload(test_db_setup_teardown):
    response = client.put(f"/api/users/4d9386e1-0eb5-4938-86b1-fbd119cbef3b", json={})
    data = response.json()
    assert response.status_code == 422
    assert data["detail"] ==  [
        {
        "loc": [
            "body",
            "first_name"
        ],
        "msg": "field required",
        "type": "value_error.missing"
        },
        {
        "loc": [
            "body",
            "last_name"
        ],
        "msg": "field required",
        "type": "value_error.missing"
        },
        {
        "loc": [
            "body",
            "email"
        ],
        "msg": "field required",
        "type": "value_error.missing"
        },
        {
        "loc": [
            "body",
            "age"
        ],
        "msg": "field required",
        "type": "value_error.missing"
        },
        {
        "loc": [
            "body",
            "marital_status"
        ],
        "msg": "field required",
        "type": "value_error.missing"
        },
        {
        "loc": [
            "body",
            "address"
        ],
        "msg": "field required",
        "type": "value_error.missing"
        }
    ]

def test_update_user_does_not_exist(test_db_setup_teardown):
    response = client.put(f"/api/users/123386e1-0eb5-4938-86b1-fbd119cbef3b", json={
        "first_name": "New John",
        "last_name": "New Doe",
        "email": "newjohndoe@gmail.com",
        "age": 100,
        "marital_status": "married",
        "address": "1017 HR Rotterdam"
    })
    data = response.json()
    assert response.status_code == 404
    assert data["detail"] == "User with id: 123386e1-0eb5-4938-86b1-fbd119cbef3b not found"
