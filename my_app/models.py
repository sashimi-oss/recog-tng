from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz

# Flask-SQLAlchemyの生成
db = SQLAlchemy()

# ==================================================
# モデル
# ==================================================
# メモ
# class User(db.Model):
#     # テーブル名
#     __tablename__ = 'users'
#     # ID（PK）
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     # 名前（NULL許可しない）
#     name = db.Column(db.String(50), nullable=False)
#     # 内容
#     # content = db.Column(db.Text)

# class Role(db.Model):
#     #テーブル名
#     __tablename__ = 'roles'
#     # ID（PK）
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     # 役柄名（NULL許可しない）
#     role = db.Column(db.String(50), nullable=False)

class Recog(db.Model):
    #テーブル名
    __tablename__ = 'recogs'
    # ID（PK）
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 役柄名（NULL許可しない） 話者認識結果
    result = db.Column(db.String(20), nullable=False)
    #　入力時
    date = db.Column(db.DateTime, default=datetime.now(pytz.timezone('Asia/Tokyo')))