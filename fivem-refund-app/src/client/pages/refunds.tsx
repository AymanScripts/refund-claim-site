import React, { useEffect, useState } from 'react';
import RefundForm from '../components/RefundForm';

const RefundsPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Check user authorization status (this could be an API call)
        const checkAuthorization = async () => {
            const response = await fetch('/api/user/check-authorization');
            const data = await response.json();
            setIsAuthorized(data.isAuthorized);
        };

        checkAuthorization();
    }, []);

    return (
        <div>
            <h1>Refund Management</h1>
            {isAuthorized ? (
                <RefundForm />
            ) : (
                <p>You do not have permission to access this page.</p>
            )}
        </div>
    );
};

export default RefundsPage;