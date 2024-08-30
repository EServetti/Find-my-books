import CustomRouter from './customRouter.js';
import indexApi from './index.api.js';

class IndexRouter extends CustomRouter {
   init() {
    this.use('/api', indexApi);
   }
}
 const indexRouter= new IndexRouter()

export default indexRouter.getRouter();