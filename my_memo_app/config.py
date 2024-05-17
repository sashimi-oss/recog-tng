import os
# ==================================================
# 設定
# ==================================================
class Config(object):
    # デバッグモード
    DEBUG=True
    # 警告対策
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # DB設定
    # SQLALCHEMY_DATABASE_URI = "sqlite:///memodb.sqlite"
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8mb4'.format(**{
        'user': os.getenv('DB_USER', 'hoge'),
        'password': os.getenv('DB_PASSWORD', 'fuga'),
        'host': os.getenv('DB_HOST', 'flask-todo-pra'),
        'database': os.getenv('DB_DATABASE', 'todo')
    })