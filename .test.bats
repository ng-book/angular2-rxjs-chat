#!/usr/bin/env bats
DIR=$(dirname $BATS_TEST_FILENAME)

load "${NGBOOK_ROOT}/scripts/bats/fullstack.bats"
load "${NGBOOK_ROOT}/scripts/bats-support/load.bash"
load "${NGBOOK_ROOT}/scripts/bats-assert/load.bash"

@test "angular-rxjs-chat unit tests pass" {
 cd $DIR
 run ng test --single-run
 assert_output --partial 'SUCCESS'
}

@test "angular-rxjs-chat e2e tests pass" {
  cd $DIR
  run_ng_e2e $TEST_TMP_DIR
  run cat ${TEST_TMP_DIR}/log.txt
  assert_output --partial 'SUCCESS'
}

@test "angular-rxjs-chat linting passes" {
  cd $DIR
  run npm run lint
  assert_output --partial 'All files pass linting'
}

setup() {
  echo "travis_fold:start:angular-rxjs-chat"
  cd $DIR
  TEST_TMP_DIR="$(mktemp -d -t fullstackXXX)"
  kill_ng_cli || :
  kill_by_port 4200
  true
}

teardown() {
  cd $DIR
  kill_ng_cli || :
  kill_by_port 4200
  echo "travis_fold:end:angular-rxjs-chat"
  true
}
