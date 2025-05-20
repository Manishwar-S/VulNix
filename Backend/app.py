from flask import Flask, jsonify
from flask_socketio import SocketIO
import threading
import asyncio
from scraper import main as run_scraper  # Import the scraper function
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable WebSockets

def run_scraper_thread():
    asyncio.run(run_scraper(socketio))  # Pass socket to send updates

@app.route('/start_scraping', methods=['GET'])
def start_scraping():
    thread = threading.Thread(target=run_scraper_thread)
    thread.start()
    return jsonify({"message": "Scraping started!"})

if __name__ == '__main__':
    socketio.run(app, debug=True)
