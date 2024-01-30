from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Base(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

class User(Base):
    role = db.Column(db.String(50), default='user')
    properties = db.relationship('Property', backref='user', lazy=True)

class Owner(Base):
    role = db.Column(db.String(50), default='owner')
    properties = db.relationship('Property', backref='owner', lazy=True)

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    image = db.relationship('Image', backref='property', lazy=True)

    def to_dict(self):
        data = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        data['image'] = [image.image for image in self.image]
        return data
    
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    image = db.Column(db.String(255), nullable=False)