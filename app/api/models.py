from django.db import models

class User(models.Model):
    name = models.CharField(max_length=120)
    surname = models.CharField(max_length=120)
    password = models.CharField(max_length=120)
    e_mail = models.CharField(max_length=120)
    phone = models.CharField(max_length=120)

class Drone(models.Model):
    brand = models.CharField(max_length=120)
    model = models.CharField(max_length=120)
    weight = models.FloatField()
    category = models.CharField(max_length=120)
    max_altitude = models.FloatField()
    power_source = models.CharField(max_length=120)
    speed = models.FloatField()
    departure = models.CharField(max_length=120)
    landing = models.CharField(max_length=120)
    length = models.FloatField()
    image = models.ImageField(upload_to='drone_images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=120)

class Rented(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    drone_id = models.ForeignKey(Drone, on_delete=models.CASCADE)


