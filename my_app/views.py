from flask import render_template, request, redirect, url_for
from app import app
from models import db, Recog

# ==================================================
# ルーティング
# ==================================================

#トレーニングしたい性別を選べる画面
@app.route("/index")
def index():
    return render_template("index.html")

#男性の役柄トレーニング
@app.route("/men")
def men():
    # return 'men dayo'
    return render_template("men.html")

#女性の役柄トレーニング
@app.route("/women")
def women():
    # return 'women dayo'
    return render_template("women.html")

#全ての役柄トレーニング
@app.route("/all")
def all():
    # return 'all dayo'
    return render_template("all.html")

#結果_すべての役柄
@app.route("/result_all")
def result_all():
    recogs = Recog.query.order_by(Recog.id.desc()).limit(10).all()
    recogs.reverse()  # 最新の10件を古い順に並び替え
    # print('-------------------------------------------------')
    # print(recogs[0].__dict__)
    # for recog in recogs:  # recogsの中身を表示
    #     print(recog.result)
    result_for_unique = []
    for i in range(10):
        result_for_unique.append(recogs[i].result)
    unique_results = set(result_for_unique)
    unique_cnt = len(unique_results)
    return render_template("result_all.html", recogs = recogs, unique_cnt = unique_cnt)

#結果_men_or_women
@app.route("/result_mw")
def result_mw():
    recogs = Recog.query.order_by(Recog.id.desc()).limit(5).all()
    recogs.reverse()  # 最新の10件を古い順に並び替え
    result_for_unique = []
    for i in range(5):
        result_for_unique.append(recogs[i].result)
    unique_results = set(result_for_unique)
    unique_cnt = len(unique_results)
    return render_template("result_mw.html", recogs = recogs, unique_cnt = unique_cnt)

#tenflag_judge
@app.route('/tenflag_judge')
def tenflag_judge():
    recog = Recog.query.order_by(Recog.date.desc()).first()
    if recog.tenflag:
        return redirect(url_for('result_all'))
    else:
        return redirect(url_for('result_mw'))
    
#使い方
@app.route("/howto")
def howto():
    return render_template("howto.html")

@app.route('/')
def root():
    return redirect(url_for('index'))

#admin 管理者
@app.route('/admin')
def admin():
    recogs = Recog.query.order_by(Recog.date.asc()).all()

    return render_template('admin.html', recogs = recogs)



# # 一覧
# @app.route("/memo")
# def index():
#     # メモ全件取得
#     memos = Memo.query.all()
#     # 画面遷移
#     return render_template("index.html", memos=memos)

# # 登録
# @app.route("/memo/create", methods=["GET", "POST"])
# def create():
#     # POST時
#     if request.method == "POST":
#         # データ入力取得
#         title = request.form["title"]
#         content = request.form["content"]
#         # 登録処理
#         memo = Memo(title=title, content=content)
#         db.session.add(memo)
#         db.session.commit()
#         # 画面遷移
#         return redirect(url_for("index"))
#     # GET時
#     # 画面遷移
#     return render_template("create.html")

# # 更新
# @app.route("/memo/update/<int:memo_id>", methods=["GET", "POST"])
# def update(memo_id):
#     # データベースからmemo_idに一致するメモを取得し、
#     # 見つからない場合は404エラーを表示
#     memo = Memo.query.get_or_404(memo_id)
#     # POST時
#     if request.method == "POST":
#         # 変更処理
#         memo.title = request.form["title"]
#         memo.content = request.form["content"]
#         db.session.commit()
#         # 画面遷移
#         return redirect(url_for("index"))
#     # GET時
#     # 画面遷移
#     return render_template("update.html", memo=memo)

# # 削除
# @app.route("/memo/delete/<int:memo_id>")
# def delete(memo_id):
#     # データベースからmemo_idに一致するメモを取得し、
#     # 見つからない場合は404エラーを表示
#     memo = Memo.query.get_or_404(memo_id)
#     # 削除処理
#     db.session.delete(memo)
#     db.session.commit()
#     # 画面遷移
#     return redirect(url_for("index"))

# # モジュールのインポート
# from werkzeug.exceptions import NotFound

# # エラーハンドリング
# @app.errorhandler(NotFound)
# def show_404_page(error):
#     msg = error.description
#     print('エラー内容：',msg)
#     return render_template('errors/404.html', msg=msg) , 404