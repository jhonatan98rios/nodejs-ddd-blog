# Install dev-dependencies and transpile typescript
FROM node:19.0.0-alpine3.16 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

RUN npm install
COPY . /usr/src/app

RUN npm run build
RUN rm -rf node_modules

RUN npm install --production
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune


# Copy only necessary files
FROM gcr.io/distroless/nodejs18-debian11 as runner

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/.env /usr/src/app/
COPY --from=builder /usr/src/app/package.json /usr/src/app/

WORKDIR /usr/src/app

EXPOSE 5000
CMD ["dist/index.js"]