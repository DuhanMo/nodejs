const {
  Worker, isMainTread, parentPort,
} = require('worker_threads');

if (isMainTread) { // when parent
  const
  worker = new Worker(__filename);
  worker.on('message', message => console.log('from worker', message));
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('ping');

} else { // when worker
  parentPort.on('message', (value) => {
    console.log('from parent', value);
    parentPort.postMessage('pong');
    parentPort.close(); 

  });
}

