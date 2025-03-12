import {
    useState,
    type Dispatch,
    type SetStateAction,
    type RefObject,
    Fragment,
    cloneElement,
    type ReactElement,
} from 'react';
import Range from './Range';
import { clsx } from '../../../../Hug/utils';

import styles from '../index.module.css';

interface ControlsProps {
    videoRef: RefObject<HTMLVideoElement>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    randomPlay?: ReactElement;
    mute?: ReactElement;
}

const Controls = (props: ControlsProps) => {
    const { videoRef, isPlaying, setIsPlaying, randomPlay, mute } = props;
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const onTogglePlay = (): void => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        if (htmlVideo.paused) {
            void htmlVideo.play();
            setIsPlaying(true);
        } else {
            htmlVideo.pause();
            setIsPlaying(false);
        }
    };

    const onVolumeChangeRange = (number: number): void => {
        setVolume(number);
        if (videoRef.current != null) {
            videoRef.current.volume = number;
        }
    };

    const onPlayRandom = (): void => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        const randomTime = Math.random() * htmlVideo.duration;
        htmlVideo.currentTime = randomTime;
        void htmlVideo.play();
        setIsPlaying(true);
    };

    const onToggleMute = (): void => {
        const htmlVideo = videoRef.current;
        if (htmlVideo == null) return;
        htmlVideo.muted = !htmlVideo.muted;
        setIsMuted(htmlVideo.muted);
    };

    return (
        <Fragment>
            <div className={styles.controls}>
                <button
                    className={clsx(isPlaying ? styles.playing : styles.paused)}
                    onClick={onTogglePlay}
                >
                    <span className={styles.offscreen}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </span>
                </button>
                <Range
                    min="0"
                    max="1"
                    step="0.01"
                    initial={volume}
                    onChangeValue={onVolumeChangeRange}
                />
            </div>
            <div className={styles.extraControls}>
                {randomPlay != null &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cloneElement(randomPlay, { onClick: onPlayRandom } as any)}
                {mute != null &&
                    cloneElement(mute, {
                        onClick: onToggleMute,
                        isMuted,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any)}
            </div>
        </Fragment>
    );
};

export default Controls;
