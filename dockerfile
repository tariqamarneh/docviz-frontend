FROM node:21.7.3-alpine 

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]