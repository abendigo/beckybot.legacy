#! /usr/bin/env bash

# Test we can access the db container allowing for start
for i in {1..50}; do mysql -u root -p${MYSQL_ROOT_PASSWORD} -h db -e "show databases" && s=0 && break || s=$? && sleep 2; done
if [ ! $s -eq 0 ]; then exit $s; fi

# Init some stuff in db before leaving the floor to the application
mysql -u root -p${MYSQL_ROOT_PASSWORD} -h db -e "create database if not exists beckybot;"
mysql -u root -p${MYSQL_ROOT_PASSWORD} -h db -e "create user if not exists 'beckybot'@'172.0.0.0/255.0.0.0' identified WITH mysql_native_password by 'FooBarIsDead'"
mysql -u root -p${MYSQL_ROOT_PASSWORD} -h db -e "create user if not exists 'beckybot'@'localhost' identified WITH mysql_native_password by 'FooBarIsDead'"
mysql -u root -p${MYSQL_ROOT_PASSWORD} -h db -e "grant all privileges on beckybot.* to 'beckybot'@'172.0.0.0/255.0.0.0';"
mysql -u root -p${MYSQL_ROOT_PASSWORD} -h db -e "grant all privileges on beckybot.* to 'beckybot'@'localhost';"
q