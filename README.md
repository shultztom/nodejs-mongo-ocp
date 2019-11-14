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

- The nodejs api should automatically restart
- The pods in the mongo stateful set will need to be manually terminated to get the new env
