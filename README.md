# Requirements

Node Version: >18.15.0
# Development

cd /api
- npm install

cd /ui
- npm install


# Running the project locally

## Start the Postgres Database
docker-compose -f docker-compose.development.yml up

## Start the API
cd /api
- npm run dev

## Start the UI
cd /ui
- npm run dev



# Production Deploy

## Build UI

Run `nom run build` under ui project. This will generate a build folder under ui



## Deploy

Run `docker-compose up` in the root directory of the project to startup the project
