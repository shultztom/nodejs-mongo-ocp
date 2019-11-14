When port-forwarding for local development, make sure you are port forwarding the master

Currently:
`oc port-forward mongodb-1 27017:27017`

Config for mongo replicaset:
https://github.com/sclorg/mongodb-container/tree/master/examples/petset

Add env to OCP:
isOCP:true

Storing credientials as secrets:

Use Generic Secrets; One for user, one for password

Map them to env variables

Updating creds:

1. Replace the mongo-password secret with the new one
   - This should update the env vars
2. Access the terminal in a pod in the stateful set and update the password manually
   1. `mongo`
   2. `use admin`
   3. `db.auth("admin", "ADMIN_PASSWORD")`
   4. `use REPLACE_WITH_DB_NAME`
   5. `db.changeUserPassword("USER", "PASSWORD")`
   6. `db.grantRolesToUser("USER", ["readWrite"])`
3. `./scripts/oc-reploy-mongo.sh`
4. Redeploy the api
