import { roleService } from './role.service';
import { userService } from './user.service';

class SeederService {
  async execute() {
    await userService.seeder();
    await roleService.seeder();
  }
}

export const seederService = new SeederService();
