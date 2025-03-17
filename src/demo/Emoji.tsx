export const emojis = {
    me: '🤸🏻',
    close: '❌',
    spell: '✨',
    rhino: '🦏 🦏',
    merfolk: '🧜🏽‍♀️',
    human: '👩🏼‍🎤',
    fairie: '🧚‍♂️',
    b: '💀',
    r: '☄️',
    u: '💧',
    w: '☀️',
    g: '🌳',
    colorless: '♦',
    zero: '0️⃣',
    one: '1️⃣',
    two: '2️⃣',
    three: '3️⃣',
    four: '4️⃣',
    five: '5️⃣',
    six: '6️⃣',
    seven: '7️⃣',
    eight: '8️⃣',
    nine: '9️⃣',
    ten: '🔟',
};

interface Props {
    name: keyof typeof emojis;
    active?: boolean;
}
function Emoji(props: Props) {
    const { name } = props;

    return <span aria-label={name}>{emojis[name]}</span>;
}

export default Emoji;
