import cluster from 'cluster'

if (cluster.isMaster) {
  // Main electron thread
  require('./main')
} else {
  // Internal thread (libcore, hardware)
  try {
    require('./internal')
  } catch (err) {
    console.log(err)
  }
}
