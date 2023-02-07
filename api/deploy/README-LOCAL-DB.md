After logged into droplet

# Update droplet

sudo apt upgrade -y
sudo apt update -y

# Add Brazilian local
sudo locale-gen pt_BR.UTF-8

# Install Postgres

sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
sudo -i -u postgres (login as postgres user)
psql (connect to postgres)
createuser --interactive
createdb sathi
sudo adduser sathi
sudo -i -u sathi

sudo vim /etc/postgresql/<version>/main/pg_hba.conf

"local"
local all all md5 (instead of peer)

IPV4 Local connections
host all all 0.0.0.0/0 md5

sudo service postgresql restart


https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart

# Enable and configure firewall

ufw enable
ufw allow 5432/tcp
ufw allow ssh
ufw allow http
ufw allow https
ufw reload

## Change Postgres to store data in the additional volume

sudo vim /etc/postgresql/<version>/main/postgresql.conf
data_directory = '/mnt/{VOLUME_NAME}/sathi-database'
sudo service postgresql restart

Ensure postgres is listening to all IPs - on postgresql.conf: listen_addresses = '*'


## Create roles and database

createuser --interactive



take note of user password to use in .env file

# Create database, tables and seed

Login to pgadmin

Run database script located on /api/database/schema.sql

**** IMPORTANT: Check if database is in the correct VOLUME in Digital Ocean (to be saved and backed up)

# Install NVM

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

source ~/.bashrc
exec bash

# Install NodeJS 15

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 15.14.0

# Install Dependencies

npm i -g pm2

# Generate SSH Key and clone repository

ssh-keygen -t rsa -b 4096

Add key to github settings

mkdir /apps
cd /apps
git clone git@github.com:fabriciofrontarolli/sathi-informatica.git

# Install API project dependencies
cd /apps/sathi-informatica/api
npm install


# ** Configure API **

# Create .env file

cp /apps/sathi/informatica/api/.env.sample /apps/sathi/informatica/api/.env

Add DB_PASSWORD and JWT_SECRET values to file

# Run the API project

npm start
pm2 startup ubuntu


# Install and configure ngix as reverse proxy

sudo apt install nginx

vim /etc/nginx/sites-available/default

Add configuration


# server_name yourdomain.com www.yourdomain.com;
server {
  listen 80;
  server_name {DROPLET_IP} {DROPLET_IP}.com;
  root /var/www/html;
}

location /api {
  proxy_pass http://localhost:6000; #whatever port your app runs on
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

sudo nginx -t
sudo service nginx restart

API is now running on port 80

https://{DROPLET_IP}/api


# ** Configure UI **

# Install UI project dependencies and build statics

cd /apps/sathi-informatica/ui

npm install
npm run build

place build content under folder /var/www/html

# Add SSL Certificate

sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
# sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d {DROPLET_IP}.com -d www.{DROPLET_IP}.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
