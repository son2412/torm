FROM node:14.18.1-alpine

# RUN apt-get update && \
#   apt-get install -y \
#   libgtk2.0-0 \
#   libnotify-dev \
#   libgconf-2-4 \
#   libnss3 \
#   libxss1 \
#   libasound2 \
#   xvfb

WORKDIR /usr/src/app
COPY package*.json tsconfig.json ormconfig.js ./
# RUN npm config set package-lock false
RUN npm cache clean --force && npm install
# RUN npm install
RUN npm run build
RUN npm run migrate
COPY . .

FROM keymetrics/pm2:12-alpine
# EXPOSE 3000
CMD [ "npm", "run", "dev" ]