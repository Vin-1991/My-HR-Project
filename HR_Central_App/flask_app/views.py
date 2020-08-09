"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, Flask,send_from_directory,jsonify
from HR_Central_App import app
import json
import collections
import psycopg2
import time
import os
import datetime


@app.route('/favicon.ico') 
def favicon():
    return send_from_directory('./react_app/dist/images', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

#@app.route('/')
@app.route('/home')
def home():
    return render_template('html/index.html', title='HR Central')

@app.route('/login')
def login():
    """Renders the login page."""
    return render_template('html/login.html',
        title='HR-Central Login')

@app.route('/hr_central_home')
def hr_central_home():
    """Renders the login page."""
    return render_template('html/hrview.html',
        title='HR-Central')

@app.route('/hr_recruiter_home')
def hr_recruiter_home():
    """Renders the login page."""
    return render_template('html/hrrecruiter.html',
        title='HR-Central')
