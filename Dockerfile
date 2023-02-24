FROM node:10.16.0-alpine

WORKDIR /source/ineuron_assessment

COPY package.json /source/ineuron_assessment

RUN cd /source/ineuron_assessment && npm i --only=production

COPY . .

EXPOSE 3008
CMD ["sh", "-c", "node app.js"]