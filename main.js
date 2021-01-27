'use strict';

// 기존 방식
var relationship1 = {
	name: 'zero',
	friends: ['nero', 'hero', 'xero'],
	logFriends: function () {
		var that = this; // 'this' meaning relationship1 stored in 'that' 
		this.friends.forEach(function (friend) {
			console.log(that.name, friend);
		});
	},
};
relationship1.logFriends();

// ES2015에 추가된 arrow function
var relationship2 = {
	name: 'zero',
	friends: ['nero', 'hero', 'xero'],
	logFriends() {
		this.friends.forEach((friend) => console.log(this.name, friend));
	},
};
relationship2.logFriends();
console.log('------구조분해 할당------');
// 옛날 방식
// var candyMachine = {
//     status: {
//         name: 'node',
//         count: 5,
//     },
//     getCandy: function () {
//         this.status.count--;
//         return this.status.count;
//     },
// };

//업데이트
const candyMachine = {
	status: {
		name: 'node',
		count: 5,
	},
	getCandy() {
		this.status.count--;
		return this.status.count;
	},
};
const { getCandy, status: { count } } = candyMachine;
console.log(candyMachine.getCandy());


// 사람 클래스 구현 뒤 모두한 클래스가 사람클래스를 상속받는 코드작성해보기

class Human {
	constructor(type = 'human') {
		this.type = type;
	}
	static isHuman(human) {
		return human instanceof Human;
	}
	breath() {
		alert('H-a-a-a-m');
	}
}

class Duhan extends Human {
	constructor(type, firstName, lastName) {
		super(type);
		this.firstName = firstName;
		this.lastName = lastName;
	}


	sayHello() {
		super.breath();
		alert(`${this.lastName} ${this.firstName}`);
  }
}


const human = new Human();
const duhan = new Duhan('human', 'Duhan', 'Mo');


// console.log(`두한의 타입${duhan.type}`);
// duhan.sayHello();
console.log(Human.isHuman(duhan));