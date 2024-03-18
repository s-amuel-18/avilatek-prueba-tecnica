import { Role } from '../models/role.model';

export class RoleService {
  async seeder() {
    await Role.bulkCreate([{ name: 'Admin' }, { name: 'Client' }]);
  }
}

export const roleService = new RoleService();
