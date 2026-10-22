import { UserInterface } from '@/modules/auth/types/user';
import { USER_ROLES } from '@/constants/users';

export const checkPermission = (
    user: UserInterface | null | undefined,
    roles: USER_ROLES | USER_ROLES[],
) => {
    // user is not loaded yet
    if (!user) return false;
    if (Array.isArray(roles)) {
        return roles.includes(user.role);
    } else {
        return roles === user.role;
    }
};
