FROM node:alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD nodemon server.js
EXPOSE 3001