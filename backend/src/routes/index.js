import authRoute from './auth';
import userRoute from './user';
function routes(app) {
  // Route
  app.use('/auth', authRoute);
  app.use('/users',userRoute);
}

export default routes;