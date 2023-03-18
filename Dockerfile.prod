# Install dev-dependencies and transpile typescript
FROM node:16-alpine as builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json /usr/app/
COPY tsconfig.json /usr/app/

RUN npm install
COPY . /usr/app

RUN npm run build
RUN rm -rf node_modules

RUN npm install --production
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune


# Copy only necessary files
FROM gcr.io/distroless/nodejs18-debian11 as runner

COPY --from=builder /usr/app/dist /usr/app/dist
COPY --from=builder /usr/app/node_modules /usr/app/node_modules
COPY --from=builder /usr/app/.env /usr/app/
COPY --from=builder /usr/app/package.json /usr/app/

WORKDIR /usr/app

EXPOSE 5000
CMD ["dist/index.js"]