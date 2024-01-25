from faker import Faker
from random import randint
from models import db, User, Property, Owner
from app import app

fake = Faker()

with app.app_context():
    print("Deleting all records...")
    User.query.delete()
    Property.query.delete()
    Owner.query.delete()

    print("Creating users...")
    users = []
    for i in range(30):
        user_instance = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
        )
        users.append(user_instance)

    db.session.add_all(users)
    db.session.commit()

    print("Creating owners...")
    owners = []
    for i in range(30):
        owner_instance = Owner(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
        )
        owners.append(owner_instance)

    db.session.add_all(owners)
    db.session.commit()

    print("Creating properties...")
    properties = []
    for i in range(30):
        property_instance = Property(
            name=fake.word(),
            user_id=owners[i].id,  
            bedrooms=randint(1, 5),
            bathrooms=randint(1, 3),
            regular_price=randint(1000, 5000),
            location=fake.address(),
            image=fake.word()
        )
        properties.append(property_instance)

    db.session.add_all(properties)
    db.session.commit()

print("Database seeding completed.")
