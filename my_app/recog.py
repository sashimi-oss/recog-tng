from flask import render_template, request, redirect, url_for
from app import app
from models import db, Recog
import os, predictFunction
import pickle

# ==================================================
# ルーティング
# ==================================================

#トレーニングしたい性別を選べる画面
@app.route("/recog_all" , methods=["GET", "POST"])
def recog_all():
    # POST時
    if request.method == "POST":
        
        with open('all.pickle', mode='rb') as f:
            final_model = pickle.load(f)

        # db.drop_all()
        # db.create_all()
        # dropじゃなくてdeleteがよさそう
        
        file = request.files['file']
        user_name = request.form['name']
        role = request.form['role']
        file.save(os.path.join('./audio', 'uploaded.wav'))
        vcAct = {0:"おじいさん", 1:"おばあさん", 2:"少年",
            3:"男の子", 4:"女の子", 5:"少女",
            6:"青年女", 7:"青年男", 8:"おじさん", 9:"おばさん"}
        preVC = predictFunction.predictPostAudio(final_model, vcAct)

        # 登録処理
        recog_result = Recog(result=preVC, name=user_name, role=role)
        db.session.add(recog_result)
        db.session.commit()

        return render_template('recog_all.html', preVC=preVC)
    return "none"

@app.route("/recog_men" , methods=["GET", "POST"])
def recog_men():
    # POST時
    if request.method == "POST":
        
        with open('men.pickle', mode='rb') as f:
            final_model = pickle.load(f)
        
        file = request.files['file']
        user_name = request.form['name']
        role = request.form['role']
        # print(user_name)
        file.save(os.path.join('./audio', 'uploaded.wav'))
        vcAct = {0:"おじいさん", 1:"少年", 2:"男の子", 3:"青年男", 4:"おじさん"}
        preVC = predictFunction.predictPostAudio(final_model, vcAct)

        # 登録処理
        recog_result = Recog(result=preVC, name=user_name, role=role)
        db.session.add(recog_result)
        db.session.commit()

        return "none"
    return "none"

@app.route("/recog_women" , methods=["GET", "POST"])
def recog_women():
    # POST時
    if request.method == "POST":
        
        with open('women.pickle', mode='rb') as f:
            final_model = pickle.load(f)
        
        file = request.files['file']
        user_name = request.form['name']
        role = request.form['role']
        file.save(os.path.join('./audio', 'uploaded.wav'))
        vcAct = {0:"おばあさん", 1:"女の子", 2:"少女", 3:"青年女", 4:"おばさん"}
        preVC = predictFunction.predictPostAudio(final_model, vcAct)

        # 登録処理
        recog_result = Recog(result=preVC, name=user_name, role=role)
        db.session.add(recog_result)
        db.session.commit()

        return "none"
    return "アクセスできる？"



