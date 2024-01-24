from flask import Flask, make_response, jsonify, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource, reqparse
from models import db, User

app = Flask(__name__)

app.secret_key = b'ndchhacaewuhsncaxzxwxcdsac'
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

class Login(Resource):
    def post(self):
        user = User.query.filter(
            User.username == request.get_json()['username']
        ).first()

        session['user_id'] = user.id
        return jsonify(user.to_dict())
    
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return jsonify(user.to_dict())
        else:
            return jsonify({'message': '401: Not Authorized'}), 401
        
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return jsonify({'message': '204: No Content'}), 204
    
class Property(Resource):
    def get(self, property_id=None):
        if property_id:
            house_data = Property.query.filter_by(id=property_id).first()
            if house_data:
                return {
                    'id': house_data.id,
                    'name': house_data.name,
                    'type': house_data.type,
                    'user_id': house_data.user_id,
                    'bedrooms': house_data.bedrooms,
                    'bathrooms': house_data.bathrooms,
                    'parking': house_data.parking,
                    'furnished': house_data.furnished,
                    'offer': house_data.offer,
                    'regular_price': house_data.regular_price,
                    'discounted_price': house_data.discounted_price,
                    'location': house_data.location,
                    'latitude': house_data.latitude,
                    'longitude': house_data.longitude,
                    'image_urls': house_data.image_urls
                }
            else:
                return {'message': 'Property not found'}, 404
        else:
            properties = Property.query.all()
            return [{'id': prop.id, 'name': prop.name} for prop in properties]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('type', type=str, required=True)
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('bedrooms', type=int, required=True)
        parser.add_argument('bathrooms', type=int, required=True)
        parser.add_argument('parking', type=bool, required=True)
        parser.add_argument('furnished', type=bool, required=True)
        parser.add_argument('offer', type=bool, required=True)
        parser.add_argument('regular_price', type=float, required=True)
        parser.add_argument('discounted_price', type=float, required=True)
        parser.add_argument('location', type=str, required=True)
        parser.add_argument('latitude', type=float, required=True)
        parser.add_argument('longitude', type=float, required=True)
        parser.add_argument('image_urls', type=str, action='append')
        
        args = parser.parse_args()
        
        new_property = Property(
            name=args['name'],
            type=args['type'],
            user_id=args['user_id'],
            bedrooms=args['bedrooms'],
            bathrooms=args['bathrooms'],
            parking=args['parking'],
            furnished=args['furnished'],
            offer=args['offer'],
            regular_price=args['regular_price'],
            discounted_price=args['discounted_price'],
            location=args['location'],
            latitude=args['latitude'],
            longitude=args['longitude'],
            image_urls=args['image_urls'],
        )
        
        db.session.add(new_property)
        db.session.commit()
        return {'message': 'Property created successfully'}, 201
    
    def patch(self, property_id):
        property_data = Property.query.filter_by(id=property_id).first()
        if property_data:
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str)
            parser.add_argument('type', type=str)
            parser.add_argument('user_id', type=int)
            parser.add_argument('bedrooms', type=int)
            parser.add_argument('bathrooms', type=int)
            parser.add_argument('parking', type=bool)
            parser.add_argument('furnished', type=bool)
            parser.add_argument('offer', type=bool)
            parser.add_argument('regular_price', type=float)
            parser.add_argument('discounted_price', type=float)
            parser.add_argument('location', type=str)
            parser.add_argument('latitude', type=float)
            parser.add_argument('longitude', type=float)
            parser.add_argument('image_urls', type=str, action='append')
            
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
        if property_data:
            db.session.delete(property_data)
            db.session.commit()
            return {'message': 'Property deleted successfully'}
        else:
            return {'message': 'Property not found'}, 404
        
api.add_resource(Property, '/properties', '/properties/<int:property_id>')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(debug=True, port=5555)