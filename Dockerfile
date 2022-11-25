FROM node
RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ./src ./
USER node
RUN npm install
#COPY --chown=node:node . .
EXPOSE 3000
CMD ["npm","start"]
