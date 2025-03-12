import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import usePortal from './usePortal';
import { PortalProps } from './interface';

/*
    Basket for rendering local <Components/> 
    somewhere else in the tree.
    it does not persist route change,
    we could store in URL
*/

const Portal = ({ children, onMount, onUnmount }: PortalProps) => {
    const { portalTarget } = usePortal();

    useEffect(() => {
        if (portalTarget) {
            onMount?.(portalTarget);
        }

        return () => {
            if (portalTarget) {
                onUnmount?.(portalTarget);
            }
        };
    }, [portalTarget, onMount, onUnmount]);

    if (!portalTarget) return null;

    return ReactDOM.createPortal(children, portalTarget);
};

export default Portal;
