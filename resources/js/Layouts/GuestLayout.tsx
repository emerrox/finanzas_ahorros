import { usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';

const GuestLayout = ({ children }) => {
    const { user } = usePage().props;

    useEffect(() => {
        if (user) {
            router.visit('/dashboard');
        }
    }, [user]);

    return !user ? children : null;
};

export default GuestLayout;