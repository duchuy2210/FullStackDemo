import authRoute from './auth';

function routes(app) {
  // Route
  app.use('/auth', authRoute);
}

export default routes;