from flask import Flask, request
from pipeline_ia import pipeline
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/image", methods=['POST'])
def test():
    print("start")
    file = request.files['file']
    file.save(os.path.join("/app/img", "u_" + file.filename))
    return str(pipeline("u_" + file.filename))



app.run(host='0.0.0.0', port=50051, debug=True)