import CustomRouter from './customRouter.js';
import indexApi from './index.api.js';

class IndexRouter extends CustomRouter {
   init() {
    this.use('/api', logRequest, indexApi);
   }
}
 
 function logRequest(req, res, next) {
   try {
      const message = `${req.method} ${req.path} : ${new Date().toISOString()}`
      console.log(message);
      next()
   } catch (error) {
      return next(error)
   }
 }
 const indexRouter= new IndexRouter()

export default indexRouter.getRouter();