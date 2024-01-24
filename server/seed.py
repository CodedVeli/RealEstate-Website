#!/usr/bin/env python3

from faker import Faker
from random import randint
from models import db, User, Property
from app import app

fake = Faker()

with app.app_context():
    print("Deleting all records...")
    User.query.delete()
    Property.query.delete()

    print("Creating users...")
    users = []
    for _ in range(30):
        user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
        )
        users.append(user)

    db.session.add_all(users)

    print("Creating properties...")
    properties = []
    for _ in range(30):
        property = Property(
            name=fake.street_name(), 
            type=fake.random_element(elements=("Apartment", "House", "Condo")),
            user_id=randint(1, 30),  
            bedrooms=randint(1, 5),
            bathrooms=randint(1, 3),
            parking=fake.boolean(),
            furnished=fake.boolean(),
            offer=fake.boolean(),
            regular_price=randint(1000, 5000),
            discounted_price=randint(800, 4500),
            location=fake.address(),
            latitude=fake.latitude(),  
            longitude=fake.longitude(),
        )
        properties.append(property)

    db.session.add_all(properties)

    db.session.commit()
    print("Complete.")
