FROM node:alpine 

WORKDIR /usr/app

COPY package.json /usr/app

COPY server.js /usr/app

#Installs the current package
RUN nom install

EXPOSE 3000

#the comand below is hat happend we you run the container
CMD ["node", "server.js"]