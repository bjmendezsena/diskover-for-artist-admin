FROM node:14

WORKDIR /app
COPY . .

RUN npm install react-scripts -g --silent
RUN npm install
RUN npm run build
RUN npm -g i serve

CMD ["serve", "-p", "80", "-s", "build"]
