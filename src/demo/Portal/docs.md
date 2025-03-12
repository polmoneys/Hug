**serious insight** from jjenzz: 

>When passing a component through a Portal
>it will not replace the children in the node you provide,
>it will append to it.


Use it 

```tsx

// App.tsx
<PortalProvider>
  <Outlet />
</PortalProvider>

const { portalTarget, setPortalTarget } = usePortal();

const setPortal = (target?: string) => {
      if (portalTarget === null && !has(target)) {
          setPortalTarget('aside');
      }
  };

// render 
<Portal>{...}</Portal>


```


With Delay

Delayed mounting and unmounting can be particularly useful when you want to avoid showing or hiding portal content immediately. This delay can be used to improve UX, especially when the portal content involves animations or when the portal should mount only after some condition is met (e.g., after data has loaded, after a delay, or after a certain action).

```tsx



interface PortalProps {
  children: ReactNode;
  delayMount?: number;  // Delay in milliseconds before mounting the portal
  delayUnmount?: number; // Delay in milliseconds before unmounting the portal
}

type PortalContextValue = HTMLElement | null;

const PortalContext = createContext<PortalContextValue>(null);

interface PortalProviderProps {
  children: ReactNode;
  portalId: string;
}

export const PortalProvider = ({ children, portalId }: PortalProviderProps) => {
  const fallbackRef = useRef<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const targetElement = document.getElementById(portalId);

    if (targetElement) {
      setPortalTarget(targetElement);
    } else {
      console.warn(`No element with ID "${portalId}" found. Using fallback target.`);
      if (!fallbackRef.current) {
        fallbackRef.current = document.createElement("div");
        fallbackRef.current.id = "fallback-portal-target";
        document.body.appendChild(fallbackRef.current);
      }
      setPortalTarget(fallbackRef.current);
    }

    return () => {
      if (fallbackRef.current) {
        document.body.removeChild(fallbackRef.current);
        fallbackRef.current = null;
      }
    };
  }, [portalId]);

  return <PortalContext.Provider value={portalTarget}>{children}</PortalContext.Provider>;
};

export const usePortal = (): HTMLElement => {
  const portalTarget = useContext(PortalContext);
  if (!portalTarget) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return portalTarget;
};

interface PortalProps {
  children: ReactNode;
  delayMount?: number;  // Delay in milliseconds before mounting the portal
  delayUnmount?: number; // Delay in milliseconds before unmounting the portal
}

 const Portal = ({ children, delayMount = 0, delayUnmount = 0 }: PortalProps) => {
  const portalTarget = usePortal();
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    // Delay portal mounting
    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
    }, delayMount);

    // Delay portal unmounting
    const unmountTimeout = setTimeout(() => {
      setIsMounted(false);
    }, delayUnmount);

    // Cleanup the timeouts on component unmount
    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(unmountTimeout);
    };
  }, [delayMount, delayUnmount]);

  // Only render the portal if it is mounted
  return isMounted ? ReactDOM.createPortal(children, portalTarget) : null;
};


```

With Custom Events

```tsx

interface PortalProps {
  children: ReactNode;
  onMount?: (target: HTMLElement) => void; // Callback when portal is mounted
  onUnmount?: (target: HTMLElement) => void; // Callback when portal is unmounted
}

export const Portal = ({ children, onMount, onUnmount }: PortalProps) => {
  const portalTarget = usePortal();
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Emit 'portalRendered' custom event when portal content is mounted
    const portalRenderedEvent = new CustomEvent("portalRendered", {
      detail: { target: portalTarget },
    });
    portalTarget?.dispatchEvent(portalRenderedEvent);

    // Trigger onMount callback if provided
    if (portalTarget && onMount) {
      onMount(portalTarget);
    }

    return () => {
      // Emit 'portalRemoved' custom event when portal content is unmounted
      const portalRemovedEvent = new CustomEvent("portalRemoved", {
        detail: { target: portalTarget },
      });
      portalTarget?.dispatchEvent(portalRemovedEvent);

      // Trigger onUnmount callback if provided
      if (portalTarget && onUnmount) {
        onUnmount(portalTarget);
      }
    };
  }, [portalTarget, onMount, onUnmount]);

  return ReactDOM.createPortal(children, portalTarget);
};

// Example usage
export const App = () => {
  useEffect(() => {
    // Listen for custom portal events
    const handlePortalRendered = (event: CustomEvent) => {
      console.log("Portal rendered in target:", event.detail.target);
    };

    const handlePortalRemoved = (event: CustomEvent) => {
      console.log("Portal removed from target:", event.detail.target);
    };

    // Add event listeners for 'portalRendered' and 'portalRemoved'
    document.addEventListener("portalRendered", handlePortalRendered);
    document.addEventListener("portalRemoved", handlePortalRemoved);

    // Cleanup event listeners when the component unmounts
    return () => {
      document.removeEventListener("portalRendered", handlePortalRendered);
      document.removeEventListener("portalRemoved", handlePortalRemoved);
    };
  }, []);

  return (
    <PortalProvider portalId="existing-portal-target">
      <div id="existing-portal-target" style={{ border: "2px dashed gray", padding: "10px" }}>
        <h2>Portal Target</h2>
      </div>
      <Portal>
        <div style={{ background: "lightblue", padding: "10px" }}>Injected Content</div>
      </Portal>
    </PortalProvider>
  );
};


```
