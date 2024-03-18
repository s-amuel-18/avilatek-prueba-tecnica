import app from './app';
import { environment } from './config/environment.config';
import { DATABASE } from './config/sequelize.config';
import { Product } from './models/product.model';
import { Role } from './models/role.model';
import { User } from './models/user.model';

app.listen(environment.APP_PORT, () => {
  try {
    console.log('[SERVER STARTED]');

    DATABASE.authenticate()
      .then(async () => {
        console.log('[DATABASE]: Successfully connected');

        DATABASE.addModels([User, Role, Product]);

        await DATABASE.sync({ force: environment.DB_FORCE_SYNC });
      })
      .catch(() => {
        console.log('[DATABASE]: Connection failed ❌');
      });
  } catch (error) {
    console.log('[SERVER ERROR]');
  }
});
