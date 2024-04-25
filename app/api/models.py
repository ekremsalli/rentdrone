from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    avatar = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.email
    
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
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    drone_id = models.ForeignKey(Drone, on_delete=models.CASCADE)
    