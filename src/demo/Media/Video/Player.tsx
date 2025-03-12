import { forwardRef } from 'react';
import { PlayerProps } from '../interface';
import { clsx } from '../../../Hug/utils';

import styles from './index.module.css';

/*

    const mainVideoRef = useRef<HTMLVideoElement>(null);

    const secondVideoRef = useRef<HTMLVideoElement>(null);
    const handleMainVideoSeeked = (
        event: React.SyntheticEvent<HTMLVideoElement, Event>,
    ): void => {
        const mainVideo = event.currentTarget;

        if (secondVideoRef.current != null) {
            secondVideoRef.current.currentTime = mainVideo.currentTime;
        }
    };

    <Player
            ratio="landscape"
            ref={mainVideoRef}
            sources={{
                mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
            }}
            onSeeked={handleMainVideoSeeked}
            controls
    />

    <Player
        ratio="portrait"
        ref={secondVideoRef}
        sources={{
            mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        }}
        controls
        preload="auto"
    />
    
*/

const Player = forwardRef<HTMLVideoElement, PlayerProps>((props, ref) => {
    const {
        sources,
        preload = 'metadata',
        controls = false,
        playsInline = true,
        onLoad: onVideoLoaded,
        ratio = 'landscape',
        subtitles,
        // muted,
        // loop,
        ...options
    } = props;
    return (
        <video
            className={clsx(styles.video, styles[ratio])}
            ref={ref}
            preload={preload}
            controls={controls}
            playsInline={playsInline}
            onLoadedData={onVideoLoaded}
            {...options}
        >
            {Object.keys(sources).map((key) => (
                <source type={`video/${key}`} src={sources[key]} key={key} />
            ))}
            {/* 
                <source media="(orientation: landscape)" src="sunset-landscape-1080.mp4">
                <source src="sunset-portrait-1080.mp4"> 
            */}
            {subtitles !== undefined && (
                <track
                    kind="subtitles"
                    src={`./${subtitles}`}
                    srcLang="en"
                    label="English"
                    default
                />
            )}
        </video>
    );
});

export default Player;
