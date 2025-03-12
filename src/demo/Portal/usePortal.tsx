import { useContext } from 'react';
import { PortalContext } from './contex';

const usePortal = () => {
    const context = useContext(PortalContext);
    if (!context) {
        throw new Error('usePortal must be used within a PortalProvider');
    }
    return context;
};

export default usePortal;
