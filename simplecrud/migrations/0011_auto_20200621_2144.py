# Generated by Django 3.0.3 on 2020-06-22 02:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('simplecrud', '0010_auto_20200621_2140'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='deploy_date',
            new_name='deployDate',
        ),
    ]
