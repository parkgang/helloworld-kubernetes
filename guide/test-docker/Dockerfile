FROM node

WORKDIR ${pwd}

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "app.js" ]