import { ClipVariant } from './interfaces';

export const clipPathValues: Record<ClipVariant, string> = {
    circle: 'circle(50% at 50% 50%)',
    rounded: 'inset(0 round 10%)',
    ellipse: 'ellipse(50% 40% at 50% 50%)',
    hide: 'inset(100% 100% 100% 100%)',
    hideTop: 'inset(50% 0px 0px 0px)',
    hideRight: 'inset(0px 50% 0px 0px)',
    hideBottom: 'inset(0px 0px 50% 0px)',
    hideLeft: 'inset(0px 0px 50% 0px)',
};
