import { HugsComponentProps } from './interfaces';
import Slot from './Slot';
import { isSlotsProps } from './utils';
import Hugger from './Hug';
import Us from './Us';

const Hug = (props: HugsComponentProps) => {
    if (isSlotsProps(props)) {
        return <Slot {...props} />;
    }
    return <Hugger {...props} />;
};

export default Object.assign(Hug, { Us });
