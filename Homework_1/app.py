from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
applications = ["application1"];



@app.route('/api/applications', methods=['GET'])
def get_all_applications_v2():
    return jsonify({'list of applications':applications})



# API to add a application to the database
@app.route('/api/add_application', methods=['POST'])
def add_application():
    print("adding application")
    data = request.get_json()
    title = data.get('title')
    applications.append(title);
    return jsonify({'message': 'Application added successfully'})
 
# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
