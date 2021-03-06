FROM node:8.11.4
MAINTAINER Unlock <ops@unlock-protocol.com>
RUN npm install -g npm@6.4.1

RUN mkdir /home/unlock
RUN mkdir /home/unlock/scripts
RUN chown -R node /home/unlock
WORKDIR /home/unlock

USER node

# To leverage the docker caching it is better to install the deps
# before the file changes. This will allow docker to not install
# dependencies again if they are not changed.

COPY --chown=node scripts/postinstall.sh /home/unlock/scripts/postinstall.sh
COPY --chown=node package-lock.json /home/unlock/.
COPY --chown=node package.json /home/unlock/.
RUN SKIP_SERVICES=true npm ci

RUN mkdir /home/unlock/tests
COPY --chown=node tests/package-lock.json /home/unlock/tests/.
COPY --chown=node tests/package.json /home/unlock/tests/.
WORKDIR /home/unlock/tests
RUN npm ci

RUN mkdir /home/unlock/smart-contracts
COPY --chown=node smart-contracts/package-lock.json /home/unlock/smart-contracts/.
COPY --chown=node smart-contracts/package.json /home/unlock/smart-contracts/.
WORKDIR /home/unlock/smart-contracts
RUN npm ci

RUN mkdir /home/unlock/unlock-app
COPY --chown=node unlock-app/package-lock.json /home/unlock/unlock-app/.
COPY --chown=node unlock-app/package.json /home/unlock/unlock-app/.
WORKDIR /home/unlock/unlock-app
RUN npm ci

# Copy the rest
COPY --chown=node . /home/unlock

WORKDIR /home/unlock/

# build it all
RUN npm run build

