FROM stocard/node:10

COPY /package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --silent --frozen-lockfile

COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.webpack.json ./tsconfig.webpack.json
COPY ./tslint.json ./tslint.json
COPY ./vue-shims.d.ts ./vue-shims.d.ts
COPY ./fileDeclarations.d.ts ./fileDeclarations.d.ts
COPY ./webpack/webpack.base.config.js ./webpack/webpack.base.config.js
COPY ./webpack.config.js ./webpack.config.js
COPY ./nodemon.json ./nodemon.json

WORKDIR /root
ENV NODE_ENV development

EXPOSE 10000
CMD ["node", "/root/build/index.js"]
