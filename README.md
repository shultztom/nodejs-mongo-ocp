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
2. Access the terminal in a pod in the stateful set and update the password manually (`oc rsh mongodb-0`)
   1. `touch update.sh`
   2. `vi update.sh`
   3. Copy update-mongo-creds.sh into the file
   4. Save and Exit (Esc, then :wq)
   5. `chmod +x update.sh`
   6. `./update.sh`
3. `./scripts/oc-reploy-mongo.sh`
4. Redeploy the api (`oc deploy --latest dc/nodejs-mongo`)
