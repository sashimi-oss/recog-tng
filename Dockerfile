# pythonのバージョンは任意
FROM python:3.8

WORKDIR /app
ENV FLASK_APP=app
COPY ./requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN echo "deb http://archive.debian.org/debian/ stretch main" > /etc/apt/sources.list \
    && echo "deb http://archive.debian.org/debian-security stretch/updates main" >> /etc/apt/sources.list 
#      ↑ 実行すると  apt update　→　apt install vim などができる
RUN apt-get update 
    # && apt-get install -y vi 
    # && apt-get install -y locales \
    # && sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen \
    # && locale-gen \
    # && update-locale LANG=ja_JP.UTF-8 \
    # && apt-get clean \
    # && rm -rf /var/lib/apt/lists/* \

ENV LC_ALL ja_JP.UTF-8