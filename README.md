This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Docker commands

Keep in mind that the .env file is still needed.

For starting development admin enviroment using Docker:  
`docker-compose -p hobeen-admin-dev up -d --build`

Production enviroment using Docker:  
`docker-compose -p hobeen-admin -f docker-compose.prod.yml up -d --build`
