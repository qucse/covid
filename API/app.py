from flask import Flask, request
import pandas as pd

app = Flask(__name__)
df = pd.read_csv('./static/data-1.csv')


@app.route('/api/covid19', methods=['GET'])
def hello_world():
    if 'country' in request.args:
        country = request.args['country']
    else:
        return "Error: No country field provided. Please specify country."
    data = df[df['administrative_area_level_1']
              == country].to_json(orient='records')
    return data


if __name__ == '__main__':
    app.run()
