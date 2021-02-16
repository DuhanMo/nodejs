db.users.save({
	name:'zero',
	age:24,
	 married: false,
	 comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.',
	 createdAt: new Date()
	 });
db.users.find({name: 'zero'}, {_id: 1})
db.comments.save({
	commenter: ObjectId("602b54e65a98c6947eb50488"),
	comment: '안녕하세요 zero의 댓글입니다.',
	createdAt: new Date()
	});
db.users.find({});
db.users.find({}, { _id: 0, name: 1, married: 1});

db.createUser({user:'root', pwd:'1111', roles: ['root']})