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
    "https://nadjide.github.io",
    "https://nadjide.github.io/form2-app",
    "http://localhost:3000",
    "https://form2-app.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    if os.getenv("VERCEL_ENV") == "production":
        # Configuration pour AlwaysData avec les variables Vercel
        return mysql.connector.connect(
            host=os.getenv("ALWAYSDATA_HOST", "mysql-form2app.alwaysdata.net"),
            port=3306,
            user=os.getenv("MYSQL_USER", "form2app"),
            password=os.getenv("MY_SQL_ROOT_PASSWORD"),
            database=os.getenv("MYSQL_DB", "form2app_db"),
            charset='utf8mb4',
            use_unicode=True,
            autocommit=True
        )
    else:
        # Configuration pour développement local (Docker)
        return mysql.connector.connect(
            database=os.getenv("MYSQL_DATABASE", "form2app"),
            user=os.getenv("MYSQL_USER", "form2user"),
            password=os.getenv("MYSQL_PASSWORD", os.getenv("MYSQL_ROOT_PASSWORD", "form2password")),
            port=3306, 
            host=os.getenv("MYSQL_HOST", "localhost")
        )

@app.get("/")
async def hello_world():
    return {"message": "Hello world", "status": "API is running", "env": os.getenv("VERCEL_ENV", "development")}

@app.get("/health")
async def health_check():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        conn.close()
        return {
            "status": "healthy", 
            "database": "connected",
            "env": os.getenv("VERCEL_ENV", "development"),
            "db_host": os.getenv("ALWAYSDATA_HOST", "localhost") if os.getenv("VERCEL_ENV") == "production" else "localhost"
        }
    except Exception as e:
        return {
            "status": "unhealthy", 
            "error": str(e),
            "env": os.getenv("VERCEL_ENV", "development")
        }

@app.get("/users")
async def get_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql_select_Query = "SELECT * FROM utilisateur"
        cursor.execute(sql_select_Query)
        records = cursor.fetchall()
        
        columns = [desc[0] for desc in cursor.description]
        users_list = []
        for record in records:
            user_dict = dict(zip(columns, record))
            users_list.append(user_dict)
        
        conn.close()
        return {'utilisateurs': users_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur base de données: {str(e)}")

@app.post("/users")
async def create_user(user: User):
    try:
        conn = get_db_connection()
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
    except mysql.connector.IntegrityError as e:
        raise HTTPException(status_code=400, detail="Email déjà existant")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la création: {str(e)}")

@app.post("/login")
async def login_user(login: Login):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        email = login.email
        password = login.password
        
        sql_select_Query = "SELECT * FROM admin WHERE email = %s AND password = %s"
        cursor.execute(sql_select_Query, (email, password))
        records = cursor.fetchall()
        conn.close()
        
        if len(records) > 0:
            encoded_jwt = jwt.encode({'data': [{'email': email}]}, MY_SECRET, algorithm=ALGORITHM)
            return {"token": encoded_jwt, "message": "Connexion réussie"}
        else:
            raise HTTPException(status_code=401, detail="Identifiants incorrects")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de connexion: {str(e)}")

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, authorization: Optional[str] = Header(None)):
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
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM utilisateur WHERE id = %s", (user_id,))
        conn.commit()
        affected_rows = cursor.rowcount
        conn.close()
        
        if affected_rows > 0:
            return {"message": f"Utilisateur {user_id} supprimé avec succès"}
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 