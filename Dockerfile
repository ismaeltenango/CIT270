FROM node:alpine 

COPY package.jason ./

COPY server.js ./

#Installs the current package
RUN nom install

EXPOSE 3000

#the comand below is hat happend we you run the container
CMD ["node", "server.js"]