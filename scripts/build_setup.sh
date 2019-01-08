#!/usr/bin/env bash

# this build script calls other scripts in sequence
# in order to simplify travis.yml

./pull-image.sh
./build-image.sh unlock 461040265176.dkr.ecr.us-east-1.amazonaws.com/unlock:latest
./build-image.sh unlock-integration
./docker-compose-build.sh