import { UserInterface } from '@/constants/types/user';
import { USER_ROLES } from '@/constants/users';

export const checkPermission = (
    user: UserInterface,
    roles: USER_ROLES | USER_ROLES[],
) => {
    if (Array.isArray(roles)) {
        return roles.includes(user.role);
    } else {
        return roles === user.role;
    }
};
