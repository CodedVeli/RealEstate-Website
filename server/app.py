from flask import Flask, request, jsonify, session
from itsdangerous import URLSafeTimedSerializer
from flask_bcrypt import Bcrypt 
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse 
from models import db, User, Property, Owner, Image
from authentication import token_required
 
app = Flask(__name__)
 
app.config['SECRET_KEY'] = 'navasmuller-herbert'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)


api = Api(app)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
@app.route("/home")
def hello_world():
    return "Hello, World!"
 
@app.route("/signup", methods=["POST"])
def signup():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    role = request.json.get("role", "user")
 
    user_exists = User.query.filter_by(email=email).first() is not None
    existing_owner = Owner.query.filter_by(email=email).first()

    if existing_owner:
        return jsonify({"error": "Email already exists for owner"}), 409


 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = None
    if role == "user":
        new_user = User(name=name, email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()
    elif role == "owner":
        new_user = Owner(name=name, email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()

    if new_user is None:
        return jsonify({"error": "Invalid role provided"}), 400
    

 

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "role": new_user.role,
    })



 

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")
    role = request.json.get("role", "user")

     

    if role == "user":
        user = User.query.filter_by(email=email).first()
    elif role == "owner":
        user = Owner.query.filter_by(email=email).first()
    else:
        return jsonify({"error": "Invalid user role"}), 401

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    token = s.dumps(user.email, salt='email-confirm')

    session["token"] = token

    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "token": token,
        "role": role
        
    })


class Logout(Resource):
    def delete(self):
        session.pop("token", None)
        return jsonify({'message': '204: No Content'}), 204
 
class PropertyResource(Resource):
    def get(self, property_id=None, owner_id=None):
        if property_id:
            property_data = Property.query.filter_by(id=property_id).first()
            if property_data:
                return property_data.to_dict()
            else:
                return {'message': 'Property not found'}, 404
        elif owner_id:
            properties = Property.query.filter_by(owner_id=owner_id).all()
            return [prop.to_dict() for prop in properties]    
        else:
            properties = Property.query.all()
            return [prop.to_dict() for prop in properties] 


    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('owner_id', type=int, required=True)
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('bedrooms', type=int, required=True)
        parser.add_argument('bathrooms', type=int, required=True)
        parser.add_argument('price', type=float, required=True)
        parser.add_argument('location', type=str, required=True)
        parser.add_argument('latitude', type=float, required=True)
        parser.add_argument('longitude', type=float, required=True)
        parser.add_argument('image', type=list, location='json', required=True)
        
        args = parser.parse_args()

        images = [Image(image=url) for url in args.pop('image')]
        

        
        new_property = Property(**args)
        new_property.images = images 
        
        db.session.add(new_property)
        db.session.commit()
        
        
        for image in images:
            new_image = Image(property_id=new_property.id, image=image.image)
            db.session.add(new_image)
            db.session.commit()
        return {'message': 'Property created successfully'}, 201
    
    def patch(self, property_id):
        property_data = Property.query.filter_by(id=property_id).first()
        if property_data:
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str)
            parser.add_argument('owner_id', type=int)
            parser.add_argument('bedrooms', type=int)
            parser.add_argument('bathrooms', type=int)
            parser.add_argument('price', type=float)
            parser.add_argument('location', type=str)
            parser.add_argument('latitude', type=float)
            parser.add_argument('longitude', type=float)
            parser.add_argument('image', type=str)
            
            args = parser.parse_args()

            for key, value in args.items():
                if value is not None:
                    setattr(property_data, key, value)

            db.session.commit()
            return {'message': 'Property updated successfully'}
        else:
            return {'message': 'Property not found'}, 404

    def delete(self, property_id):
        property_data = Property.query.filter_by(id=property_id).first()
        property_images = Image.query.filter_by(property_id=property_id).all()
        if property_data:
            for image in property_images:
                db.session.delete(image)
            db.session.delete(property_data)
            db.session.commit()
            return {'message': 'Property deleted successfully'}
        else:
            return {'message': 'Property not found'}, 404
        
@app.route('/protected_route')
@token_required
def protected_route():
    token = session.get("token") or request.headers.get('x-access-token')

    s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
    except:
        return jsonify({'message': 'Token is invalid!'}), 401

    return jsonify({'message': 'This is a protected route!'})

        
api.add_resource(PropertyResource, '/properties', '/properties/<int:property_id>', '/properties/owner/<int:owner_id>')
api.add_resource(Logout, '/logout')

if __name__ == "__main__":
    app.run(debug=True)