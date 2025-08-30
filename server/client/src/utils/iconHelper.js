export const getIconForRole = (role) => {
    switch (role) {
        case 'teacher':
            return 'school';
        case 'parent':
            return 'person_pin';
        case 'medical professional':
            return 'local_hospital';
        default:
            return 'person'; //  default 
    }
};