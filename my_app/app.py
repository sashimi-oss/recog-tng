from flask import Flask
from flask_migrate import Migrate
from models import db
from waitress import serve

# ==================================================
# Flask
# ==================================================
app = Flask(__name__)
# 設定ファイル読み込み
app.config.from_object("config.Config")
# dbとFlaskとの紐づけ
db.init_app(app)
# マイグレーションとの紐づけ（Flaskとdb）
migrate = Migrate(app, db)
# viewsのインポート
from views import *
# recogのインポート
from recog import *

# ==================================================
# 実行
# ==================================================
if __name__ == "__main__":
    # app.run(host='0.0.0.0', port='5001', debug=True)
    serve(app, host="0.0.0.0", port="5001")