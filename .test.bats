#!/usr/bin/env bats
DIR=$(dirname $BATS_TEST_FILENAME)

load "${NGBOOK_ROOT}/scripts/bats/fullstack.bats"
load "${NGBOOK_ROOT}/scripts/bats-support/load.bash"
load "${NGBOOK_ROOT}/scripts/bats-assert/load.bash"

@test "angular2-rxjs-chat e2e tests pass" {
  cd $DIR
  run ./node_modules/.bin/protractor
  assert_output --partial 'SUCCESS'
}

setup() {
  cd $DIR
  kill_by_port 8080
  kill_by_grep "webpack-dev-server"
  npm run go 3>- &
  true
}

teardown() {
  cd $DIR
  kill_by_port 8080
  kill_by_grep "webpack-dev-server"
  true
}
