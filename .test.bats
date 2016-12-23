#!/usr/bin/env bats
DIR=$(dirname $BATS_TEST_FILENAME)

load "${NGBOOK_ROOT}/scripts/bats/fullstack.bats"
load '/usr/local/lib/bats-support/load.bash'
load '/usr/local/lib/bats-assert/load.bash'

@test "angular2-rxjs-chat e2e tests pass" {
  cd $DIR
  run ./node_modules/.bin/protractor
  assert_output --partial 'SUCCESS'
}

setup() {
  cd $DIR
  kill_by_grep "webpack-dev-server"
  npm run go 3>- &
  true
}

teardown() {
  cd $DIR
  kill_by_grep "webpack-dev-server"
  true
}
