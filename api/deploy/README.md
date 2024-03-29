# Update droplet

sudo apt upgrade -y
sudo apt update -y

# Add Brazilian local
sudo locale-gen pt_BR.UTF-8

# Install PSQL client

sudo apt install -y postgresql-client

# Modify Digital Database to Brazil

Login to pgadmin as doadmin and run

SET timezone='America/Sao_Paulo'

ALTER USER sathi SET datestyle = 'ISO, DMY'
ALTER USER sathi SET timezone = 'America/Sao_Paulo'

OR via PSQL run, psql -U doadmin -d sathi

# Create database, tables and seed

Login to pgadmin

Run database script located on /api/database/schema.sql

OR if using PSQL, run psql -U sathi -d sathi -f schema.sql

# Install NVM and NodeJS

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

source ~/.bashrc
exec bash
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

cp /root/apps/sathi-informatica/api/.env.sample /root/apps/sathi-informatica/api/.env

Add DB_PORT, DB_PASSWORD and JWT_SECRET values to file

# Run the API project

npm start
pm2 startup ubuntu

# Install and configure ngix as reverse proxy

sudo apt install nginx

vim /etc/nginx/sites-available/default

Add configuration from file 'nginx-content.txt'

sudo nginx -t
sudo service nginx restart

https://{DROPLET_IP}/api

# ** Configure UI **

# Install UI project dependencies and build statics

cd /apps/sathi-informatica/ui

npm install
npm run build

place build content under folder /var/www/html

# Add SSL Certificate

sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d codebuilders.com -d www.codebuilders.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
