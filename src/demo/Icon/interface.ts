type Icons =
    | 'attachOutlined'
    | 'chevronDown'
    | 'arrowDown'
    | 'check'
    | 'done'
    | 'cross'
    | 'more'
    | 'kettleBell'
    | 'kettleBellOutlined'
    | 'heart'
    | 'heartOutlined'
    | 'bookmark'
    | 'bookmarkOutlined'
    | 'star'
    | 'starOutlined'
    | 'github';

export interface Props {
    name: Icons;
    size?: number;
    label: string;
    dangerousTransform?: string;
}
