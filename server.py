import json
import os
from flask import Flask, Response, request, render_template
from _hq.client import SnorkelHQCommander

app = Flask(__name__, static_url_path='', static_folder='public', template_folder='public')
commander = SnorkelHQCommander('192.168.43.6')


class System(object):
    def __init__(self, name, configs):
        self.name = name
        self.configs = configs


@app.route('/save/<system_name>/<config_file>', methods=['POST'])
def save(system_name, config_file):
    jsonConfig = request.data
    commander.deploy_configuration('10.0.0.1', system_name, config_file, jsonConfig)
    return json.dumps("Gotcha :)")


@app.route('/system/<system_name>/<config_file>')
def sys(system_name, config_file):
    return render_template('config.html', system=system_name, config=config_file)


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/systems', methods=['GET', 'POST'])
def systems():
    # systems = [System("SYS-A", ["CFG_A", "CFG-B"]), System("SYS-B", ["CFG_A (B)", "CFG-B (B)"]),
    #            System("{{ SYS-C", ["{{{ CFG_A (C) }}}", "CFG-B (C)"]),
    #            System("I'm something else", ["other", "thing", "at all"])]
    systems = commander.get_all_systems()
    return Response(json.dumps([s.__dict__ for s in systems]), mimetype='application/json',
                    headers={'Cache-Control': 'no-cache'})


if __name__ == '__main__':
    commander.initialize()
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 3000)), debug=True)
