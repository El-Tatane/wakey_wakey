from flask import Flask, request
from pipeline_ia import pipeline
import os
import json

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/image", methods=['POST'])
def test():
    print("start")
    file = request.files['file']
    file.save(os.path.join("/app/img", "u_" + file.filename))
    
    tuple_response = pipeline("u_" + file.filename)
    response_json = json.dumps({
        "AU45_c": tuple_response[2]
    })

    return response_json



app.run(host='0.0.0.0', port=80, debug=True)