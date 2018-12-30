FROM node:8.11.4
RUN npm install -g npm@6.4.1

RUN mkdir /home/unlock
RUN mkdir /home/unlock/smart-contracts
RUN mkdir /home/unlock/unlock-app

WORKDIR /home/unlock
RUN chown -R node /home/unlock
USER node

# First copy only the required npm package.json and package-lock.json (for docker layer caching)
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

COPY ./smart-contracts/package.json /home/unlock/smart-contracts/package.json
COPY ./smart-contracts/package-lock.json /home/unlock/smart-contracts/package-lock.json

COPY ./unlock-app/package.json /home/unlock/unlock-app/unlock-app/package.json
COPY ./unlock-app/package-lock.json /home/unlock/unlock-app/unlock-app/package-lock.json

# Install dependencies
RUN npm ci

# Finally copy the rest of the project 
COPY . /home/unlock
RUN chown -R node /home/unlock

WORKDIR /home/unlock
