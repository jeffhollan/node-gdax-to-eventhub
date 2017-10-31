FROM node:8.8.1-alpine
ENV NPM_CONFIG_LOGLEVEL info
COPY . /app
WORKDIR /app
ENV EVENTHUB "<pass-in-event-hub-connection-string>"
ENTRYPOINT [ "npm" ]
CMD [ "start" ]