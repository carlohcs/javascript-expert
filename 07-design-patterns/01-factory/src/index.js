const UserFactory = require('./factory/userFactory')

;(async () => {
  console.log('Starting application...');

  const userFactory = await UserFactory.createInstance();
  const result = await userFactory.find({ name: 'Carlos Henrique'})
  
  console.log({ result });
})()
