from flask import Flask, jsonify, request,render_template,send_from_directory
from google import genai
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
API_KEY = os.getenv('API_KEY')
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/generate-pun', methods=['POST'])
def generate_pun():
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Missing prompt'}), 400

        prompt = data['prompt']
        client = genai.Client(api_key=API_KEY)
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        cleaned_text = response.text.replace("*", "").replace('"', "")
        return jsonify({'text': cleaned_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')  # Set debug to False in production