When port-forwarding for local development, make sure you are port forwarding the master

Currently:
`oc port-forward mongodb-1 27017:27017`

Config for mongo replicaset:
https://github.com/sclorg/mongodb-container/tree/master/examples/petset

Add env to OCP:
isOCP:true
