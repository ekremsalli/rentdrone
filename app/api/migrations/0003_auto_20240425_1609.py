# Generated by Django 3.0.1 on 2024-04-25 13:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20240425_1553'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='record',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='record',
            name='start_date',
        ),
    ]
