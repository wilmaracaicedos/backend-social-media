FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
COPY pm2.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

RUN ls -al -R

CMD ["pm2-runtime", "pm2.json"]
