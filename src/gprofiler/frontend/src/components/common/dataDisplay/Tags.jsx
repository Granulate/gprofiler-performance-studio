

import Tag from './Tag';

const Tags = ({ tags = [], onClose = () => {} }) => {
    return (
        <ul
            onClick={(event) => {
                event.stopPropagation();
            }}
            style={{
                display: 'inline-flex',
                padding: '0px 3px',
                margin: 'auto 0',
                listStyle: 'none',
            }}>
            {tags.map((tag, i) => (
                <li key={tag}>
                    <Tag onClose={() => onClose(i)}>{tag}</Tag>
                </li>
            ))}
        </ul>
    );
};

export default Tags;
