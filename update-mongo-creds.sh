#!/bin/bash
set -e

mongo -u admin -p $MONGODB_ADMIN_PASSWORD admin <<EOF
use $MONGODB_DATABASE
db.changeUserPassword($MONGODB_USER, $MONGODB_PASSWORD)
EOF