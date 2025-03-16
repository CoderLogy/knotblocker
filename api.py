from flask import Flask, jsonify, request,render_template,send_from_directory
from google import genai
import os
app = Flask(__name__)
API_KEY = "AIzaSyCzB9WKTpbtITUut1hTZzSV72aoMbL990A"
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
        cleaned_text = response.text.replace("*", "")
        return jsonify({'text': cleaned_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')  # Set debug to False in production