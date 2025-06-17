import mysql.connector
import os
from fastapi import FastAPI, Request, Header, HTTPException, status
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from pydantic import BaseModel

MY_SECRET = "form2_secret"
ALGORITHM = "HS256"

class Login(BaseModel):
    email: str
    password: str

class User(BaseModel):
    nom: str
    prenom: str
    email: str
    date_naissance: str
    pays: str
    ville: str
    code_postal: str

app = FastAPI()
origins = [
    "https://nadjide.github.io/",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return "Hello world"

@app.get("/users")
async def get_users():
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        port=3306, 
        host=os.getenv("MYSQL_HOST"))
    cursor = conn.cursor()
    sql_select_Query = "select * from utilisateur"
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    return {'utilisateurs': records}

@app.post("/users")
async def create_user(user: User):
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        port=3306, 
        host=os.getenv("MYSQL_HOST"))
    cursor = conn.cursor()
    
    insert_query = """
    INSERT INTO utilisateur (nom, prenom, email, date_naissance, pays, ville, code_postal)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(insert_query, (
        user.nom, user.prenom, user.email, user.date_naissance,
        user.pays, user.ville, user.code_postal
    ))
    
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    
    return {
        "message": "Utilisateur créé avec succès",
        "user_id": user_id
    }

@app.post("/login")
async def create_user(login: Login):
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        port=3306, 
        host=os.getenv("MYSQL_HOST"))
    cursor = conn.cursor()
    email = login.email
    password = login.password
    sql_select_Query = "select * from admin WHERE email=\""+ str(email) +"\" AND password=\""+ str(password)+"\";"
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    if cursor.rowcount > 0:
        encoded_jwt = jwt.encode({'data': [{'email':email}]}, MY_SECRET, algorithm=ALGORITHM)
        return encoded_jwt
    else:
        raise Exception("Bad credentials")

@app.delete("/users")
async def deleteUser(id: str, authorization: Optional[str] = Header(None)):
    if authorization is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization scheme. Must be 'Bearer'.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = authorization.split(" ")[1]
    try:
        decoded_payload = jwt.decode(token, MY_SECRET, algorithms=[ALGORITHM])
        conn = mysql.connector.connect(
            database=os.getenv("MYSQL_DATABASE"),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_ROOT_PASSWORD"),
            port=3306, 
            host=os.getenv("MYSQL_HOST"))
        cursor = conn.cursor()
        cursor.execute("DELETE FROM utilisateur WHERE id = %s", (id,))
        conn.commit()
        conn.close()
        return True
    except ExpiredSignatureError:
        print("Erreur : Le jeton JWT a expiré.")
        raise Exception("Bad credentials")
    except InvalidTokenError as e:
        print(f"Erreur : Le jeton JWT est invalide : {e}")
        raise Exception("Bad credentials")
    except Exception as e:
        print(f"Une erreur inattendue est survenue lors de la vérification du jeton : {e}")
        raise Exception("Bad credentials")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 