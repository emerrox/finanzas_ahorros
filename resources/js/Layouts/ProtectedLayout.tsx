import { usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';

const ProtectedLayout = ({ children }) => {
    const { user } = usePage().props;

    useEffect(() => {
        if (!user) {
            router.visit('/login');
        }
    }, [user]);

    return user ? children : null;
};

export default ProtectedLayout;