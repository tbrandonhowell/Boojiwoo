module.exports = (db) => {
  /*
        Default Users
  */
  db.User.create({
    firstName: 'Joe',
    userName: 'Gates',
    email: 'j@g.co',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true,
    avatarColor: 8,
    avatarEyes: 10,
    avatarMouth: 16,
    avatarHat: 23,
    parentId: 1,
    points: 293870
  });
  db.User.create({
    parentId: 2,
    firstName: 'Jane',
    userName: 'Jobs',
    email: 'j@j.co',
    password: process.env.USER_PWD,
    isAdmin: false,
    avatarColor: 1,
    avatarEyes: 6,
    avatarMouth: 12,
    avatarHat: 19,
    points: 14
  });

  /*
        Default swag
  */
  // start bodies
  db.SwagStore.create({
    swagType: 'body',
    description: '',
    fileName: '/assets/images/png/body-0.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'body',
    description: '',
    fileName: '/assets/images/png/body-1.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'body',
    description: '',
    fileName: '/assets/images/png/body-2.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'body',
    description: '',
    fileName: '/assets/images/png/body-3.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'body',
    description: '',
    fileName: '/assets/images/png/body-4.png',
    pointCost: 1
  });
  // start eyes
  db.SwagStore.create({
    swagType: 'eyes',
    description: '',
    fileName: '/assets/images/png/eyes-0.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'eyes',
    description: '',
    fileName: '/assets/images/png/eyes-1.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'eyes',
    description: '',
    fileName: '/assets/images/png/eyes-2.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'eyes',
    description: '',
    fileName: '/assets/images/png/eyes-3.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'eyes',
    description: '',
    fileName: '/assets/images/png/eyes-4.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'eyes',
    description: '',
    fileName: '/assets/images/png/eyes-5.png',
    pointCost: 1
  });
  // start mouth
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-0.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-1.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-2.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-3.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-4.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-5.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'mouth',
    description: '',
    fileName: '/assets/images/png/mouth-6.png',
    pointCost: 1
  });
  // start outfit
  db.SwagStore.create({
    swagType: 'outfit',
    description: '',
    fileName: '/assets/images/png/outfit-0.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'outfit',
    description: '',
    fileName: '/assets/images/png/outfit-1.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'outfit',
    description: '',
    fileName: '/assets/images/png/outfit-2.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'outfit',
    description: '',
    fileName: '/assets/images/png/outfit-3.png',
    pointCost: 1
  });
  db.SwagStore.create({
    swagType: 'outfit',
    description: '',
    fileName: '/assets/images/png/outfit-4.png',
    pointCost: 1
  });

  /*
        Default swagOwned
  */
  db.SwagOwned.create({
    swagId: 1,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 2,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 3,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 4,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 5,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 6,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 7,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 8,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 9,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 10,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 11,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 12,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 13,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 14,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 15,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 16,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 17,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 18,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 19,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 20,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 21,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 22,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 23,
    userId: 1,
  });
  db.SwagOwned.create({
    swagId: 1,
    userId: 2,
  });
  db.SwagOwned.create({
    swagId: 6,
    userId: 2,
  });
  db.SwagOwned.create({
    swagId: 12,
    userId: 2,
  });
  db.SwagOwned.create({
    swagId: 19,
    userId: 2,
  });

  /*
        Default tasks
  */
  db.Tasks.create({
    userId: 1,
    description: 'Wash your face',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 1,
    description: 'Brush your teeth',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 1,
    description: 'Finish your homework',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 1,
    description: 'Lay out your clothes for tomorrow',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 1,
    description: 'Play outside',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 1,
    description: 'Set your alarm for tomorrow morning',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 1,
    description: 'Say something nice to your friends',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Wash your face',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Brush your teeth',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Finish your homework',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Lay out your clothes for tomorrow',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Play outside',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Set your alarm for tomorrow morning',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });
  db.Tasks.create({
    userId: 2,
    description: 'Say something nice to your friends',
    frequency: 1,
    dueNext: 1,
    points: 1,
  });


  /*
        Default parents
  */
  db.Parents.create({ name: 'Julie' });
  db.Parents.create({ name: 'Daniel' });
};
