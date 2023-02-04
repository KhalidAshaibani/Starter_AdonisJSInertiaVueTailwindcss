/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

Route.get('/', async ({ inertia }) => {
  return inertia.render('Home')
})

Route.get('/users', async () => {
  const user = await User.first();
  if (user && await Hash.verify(user.password, "123456")) {
    // verified
    return user?.name
  }
  
  return User.all();
})