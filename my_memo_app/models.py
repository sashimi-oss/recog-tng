from flask_sqlalchemy import SQLAlchemy

# Flask-SQLAlchemyの生成
db = SQLAlchemy()

# ==================================================
# モデル
# ==================================================
# メモ
class User(db.Model):
    # テーブル名
    __tablename__ = 'users'
    # ID（PK）
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 名前（NULL許可しない）
    name = db.Column(db.String(50), nullable=False)
    # 内容
    # content = db.Column(db.Text)

class Role(db.Model):
    #テーブル名
    __tablename__ = 'roles'
    # ID（PK）
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 役柄名（NULL許可しない）
    role = db.Column(db.String(50), nullable=False)

class Recog(db.Model):
    #テーブル名
    __tablename__ = 'recogs'
    # ID（PK）
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 役柄名（NULL許可しない）
    result = db.Column(db.String(50), nullable=False)