import { useRef, useEffect, useState, RefObject } from 'react';
import Player from './Player';
import Controls from './Controls/Controller';
import Edge from './Controls/Edge';
import { VideoPlayerProps } from '../interface';
import { clsx, has } from '../../../Hug/utils';
import Card from '../../Card';

import styles from './index.module.css';

/*
<VideoPlayer
        width="1300"
        height="730"
        sources={{
          // mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
          // mp4: './end.mov',
          mp4: 'https://firebasestorage.googleapis.com/v0/b/polmoneys-731c9.appspot.com/o/TVRBO%20IS%20BORN.mp4?alt=media&token=11f01e6b-f072-4e8e-ab13-997e8552d70f',
        }}
    // subtitles="subtitles.vtt"
    // poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
    videoOptions={{
            controls: false,
            onLoad: () => {
            console.log('loaded')
            },
            onEnded: () => {
            console.log('end')
            },
            onSeeked: () => {
            console.log('seeked')
            },
            onSeeking: () => {
            console.log('seek-ing')
            },
            onWaiting: () => {
            console.log('wait-ing')
            },
        }}
        >
        {({ onBlockMouseEnter, onBlockMouseLeave }) => {
                return (
                    <Fragment>
                        <Group
                            onMouseEnter={onBlockMouseEnter}
                            onMouseLeave={onBlockMouseLeave}
                            style={{
                                zIndex: 99999999999,
                                position: 'absolute',
                                width: '3rem',
                                height: '3rem',
                                backgroundColor: 'pink',
                                top: '40%',
                                left: '50%',
                            }}
                        />
                    </Fragment>
                );
            }}
</VideoPlayer>
*/

const VideoPlayer = (props: VideoPlayerProps) => {
    const {
        sources,
        videoOptions,
        width,
        height,
        title,
        subtitles,
        ratio = 'landscape',
        children,
        fitInParent,
    } = props;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isSeekingBackward, setIsSeekingBackward] = useState(false);
    const [isSeekingForward, setIsSeekingForward] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        const onTimeUpdate = (): void => {
            // const currentTime = htmlVideo.currentTime;
        };

        htmlVideo.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            htmlVideo.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, []);

    useEffect(() => {
        let interval: number | undefined;

        const seekVideo = (direction: 'backward' | 'forward'): void => {
            if (videoRef.current == null) return;
            const seekSeconds = 5; // You can change this value to adjust the seeking interval
            const currentTime = videoRef.current.currentTime;
            const newTime =
                direction === 'backward'
                    ? currentTime - seekSeconds
                    : currentTime + seekSeconds;
            videoRef.current.currentTime = Math.max(
                0,
                Math.min(newTime, videoRef.current.duration)
            );
        };

        const intervalTime = 500; // 🙏🏾 magic number

        if (isSeekingBackward) {
            interval = window.setInterval(() => {
                seekVideo('backward');
            }, intervalTime);
        } else if (isSeekingForward) {
            interval = window.setInterval(() => {
                seekVideo('forward');
            }, intervalTime);
        } else {
            if (interval !== undefined) {
                window.clearInterval(interval);
            }
        }

        return () => {
            if (interval !== undefined) {
                window.clearInterval(interval);
            }
        };
    }, [isSeekingBackward, isSeekingForward]);

    const onLongPressStart = (direction: 'backward' | 'forward'): void => {
        return direction === 'backward'
            ? setIsSeekingBackward(true)
            : setIsSeekingForward(true);
    };

    const onLongPressEnd = (direction: 'backward' | 'forward'): void => {
        return direction === 'backward'
            ? setIsSeekingBackward(false)
            : setIsSeekingForward(false);
    };

    const onBlockMouseEnter = (): void => {
        if (videoRef.current != null && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const onBlockMouseLeave = (): void => {
        if (videoRef.current?.paused != null) {
            void videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const onKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'c' || event.key === 'C') {
            const videoEl = videoRef.current;
            if (videoEl == null) return;

            const track = videoEl.textTracks[0];
            track.mode = track.mode === 'hidden' ? 'showing' : 'hidden';
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        <Card
            ratio={ratio}
            className={clsx(styles.root, fitInParent && styles.adapt)}
        >
            <Player
                ratio={ratio}
                sources={sources}
                {...videoOptions}
                ref={videoRef}
                width={width}
                height={height}
                subtitles={subtitles}
                {...(title !== undefined && {
                    'aria-label': title,
                })}
            />

            {isSeekingBackward && (
                <div aria-hidden="true" className={styles.edge} />
            )}
            <Edge
                position="start"
                onMouseDown={() => {
                    onLongPressStart('backward');
                }}
                onMouseUp={() => {
                    onLongPressEnd('backward');
                }}
                onTouchStart={() => {
                    onLongPressStart('backward');
                }}
                onTouchEnd={() => {
                    onLongPressEnd('backward');
                }}
            />
            <Edge
                position="end"
                onMouseDown={() => {
                    onLongPressStart('forward');
                }}
                onMouseUp={() => {
                    onLongPressEnd('forward');
                }}
                onTouchStart={() => {
                    onLongPressStart('forward');
                }}
                onTouchEnd={() => {
                    onLongPressEnd('forward');
                }}
            />
            {isSeekingForward && (
                <div
                    aria-hidden="true"
                    className={clsx(styles.edge, styles.end)}
                />
            )}

            <Controls
                videoRef={videoRef as RefObject<HTMLVideoElement>}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            {has(children)
                ? children({ onBlockMouseEnter, onBlockMouseLeave })
                : null}
        </Card>
    );
};

const VideoIframe = (props: VideoPlayerProps) => (
    <iframe
        // "videoplayer.html"
        src={props.iframeUrl}
        title={props.title}
        loading="lazy"
        width={props.width}
        height={props.height}
    ></iframe>
);

export default Object.assign(VideoPlayer, { VideoIframe });
