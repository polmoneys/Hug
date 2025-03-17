import { ReactNode } from 'react';
import { isBefore, isAfter } from 'date-fns';

/*

<Font> X was released <Dateish
    content="last may"
    altContent="On may 4th, 2023"
    predicate={({isBefore})=>(
        isBefore(new Date(),new Date(2024,5,1))
    )}
    />, lorem ipsun dolor sit amet 
</Font>

*/

interface Props {
    content: ReactNode;
    altContent: ReactNode;
    predicate: (dateFns: {
        isBefore: typeof isBefore;
        isAfter: typeof isAfter;
    }) => boolean;
}

export default function Dateish({ content, altContent, predicate }: Props) {
    return predicate({ isBefore, isAfter }) ? content : altContent;
}
