FROM navikt/node-express:18
ADD ./ /var/server

EXPOSE 8033

CMD ["yarn", "start"]

