```ts


<MouseTracker offset={{ x: 20, y: 20 }}>Some Text</MouseTracker>



const [target, setTarget] = useState(null);

{target && <MouseTracker offset={{ x: 10, y: 10 }}>This is a {target}</MouseTracker>}

<div className='circle' onMouseEnter={() => setTarget('circle')} onMouseLeave={() => setTarget(null)}/>
<div className='square' onMouseEnter={() => setTarget('square')} onMouseLeave={() => setTarget(null)}/>



```