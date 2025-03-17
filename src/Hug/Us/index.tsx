import Hugger from '../Hug';
import { UsProps } from '../interfaces';

export default function Us(props: UsProps) {
    const { centered, dangerous, ...rest } = props;

    return (
        <Hugger
            {...rest}
            dangerous={{
                ...(dangerous !== undefined && { ...dangerous }),
                flexWrap: 'wrap',
                ...(centered !== undefined
                    ? {
                          placeContent: 'center',
                          placeItems: 'center',
                      }
                    : {
                          alignContent: 'center',
                      }),
            }}
        />
    );
}
