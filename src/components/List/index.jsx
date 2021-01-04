import React from 'react';
import './List.scss'

function List({items}) {
    return (
        <ul className="list">
            {items.map(i => {
                return <li className={i.active && 'active'}>
                    <i>{i.icon ? i.icon : (<i className={`badge badge--${i.color}`}></i>)}</i>
                    <span>{i.name}</span>
                </li>
            })}
        </ul>
    );
}

export default List;