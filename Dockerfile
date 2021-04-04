FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# "Clean" version of npm install
RUN npm ci

# Bundle app source
ADD src ./src

CMD [ "npm", "start" ]