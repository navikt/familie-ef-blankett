FROM navikt/node-express:14-alpine
ADD ./ /var/server

EXPOSE 8033

CMD ["yarn", "start"]

