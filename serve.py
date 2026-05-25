#!/usr/bin/env python3
"""Simple static file server for the portfolio. Run: python3 serve.py"""
import os, http.server, socketserver

PORT = 5500
FOLDER = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FOLDER, **kwargs)
    def log_message(self, fmt, *args):
        pass  # suppress output

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Portfolio running at http://localhost:{PORT}")
    httpd.serve_forever()
