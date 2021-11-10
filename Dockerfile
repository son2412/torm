FROM node:carbon

RUN apt-get update && \
  apt-get install -y \
  libgtk2.0-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  xvfb

WORKDIR /usr/src/app
COPY package*.json tsconfig.json ormconfig.js ./
# RUN npm config set package-lock false
# RUN npm cache clean --force && npm install
RUN yarn install
RUN yarn build
RUN yarn migrate
COPY . .
EXPOSE 3000
CMD [ "yarn", "dev" ]