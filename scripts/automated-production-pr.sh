#!/usr/bin/env bash

set -e

COMMIT_TO_DEPLOY=$GITHUB_SHA
COMMIT_TO_DEPLOY_TIMESTAMP=`git show -s --format=%ct $COMMIT_TO_DEPLOY`

echo "This command will open a pull request to deploy $COMMIT_TO_DEPLOY to production"

echo "Creating a new branch"
BRANCH="production-$(date +%Y%m%d-%H%M%S)"
git checkout -b $BRANCH $COMMIT_TO_DEPLOY

echo "Diffing versus latest production"
LATEST_PRODUCTION=`git rev-parse origin/production`
git reset --soft $LATEST_PRODUCTION

echo "Committing diff"
COMMIT_MESSAGE="Manual deploy as of commit:$COMMIT_TO_DEPLOY"
git commit -m "$COMMIT_MESSAGE" -a --no-verify

echo "Push new production branch"
git push origin $BRANCH --no-verify

echo "Open pull request"
PROD_DEPLOY_TYPE="manual"
source "${BASH_SOURCE%/*}/production-pull-request-template.sh"

gh pr create --head $BRANCH --title "Production Deploy" --base production --body "$MESSAGE"

git checkout master
