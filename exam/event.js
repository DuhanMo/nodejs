const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('이벤트1');
});
myEvent.on('event2', () => {
  console.log('이벤트 2');
});
myEvent.on('event2', () => {
  console.log('이벤트 2 추가');
});
myEvent.once('event3',() => {
  console.log('이벤트 3');
}); // 한번만 실행 됨

myEvent.emit('event1') // 이벤트 호출
myEvent.emit('event2') // 이벤트 호출

myEvent.emit('event3') // 이벤트 호출
myEvent.emit('event3') // 실행 안됨

myEvent.on('event', () => {
  console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안됨

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); //실행 안됨

console.log(myEvent.listenerCount('event2'));