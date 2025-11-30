import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:postgres@localhost:5432/personas_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False  # Para soportar caracteres especiales en español
