#!/usr/bin/env bash

# this build script calls other scripts in sequence
# in order to simplify travis.yml

scripts/pull-image.sh
scripts/build-image.sh unlock 461040265176.dkr.ecr.us-east-1.amazonaws.com/unlock:latest
scripts/build-image.sh unlock-integration
scripts/docker-compose-build.sh