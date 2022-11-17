use mysql;
create database if not exists beckybot;
create user if not exists 'beckybot'@'172.0.0.0/255.0.0.0' identified WITH mysql_native_password by 'FooBarIsDead';
create user if not exists 'beckybot'@'192.168.0.0/255.255.0.0' identified WITH mysql_native_password by 'FooBarIsDead';
grant all privileges on beckybot.* to 'beckybot'@'172.0.0.0/255.0.0.0';
grant all privileges on beckybot.* to 'beckybot'@'192.168.0.0/255.255.0.0'

