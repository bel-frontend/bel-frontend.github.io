import { USER_ROLES } from '@/constants/users';

export interface UserInterface {
    user_id: string;
    email: string;
    iat: number;
    exp: number;
    role: USER_ROLES;
    loaded: boolean;
}
