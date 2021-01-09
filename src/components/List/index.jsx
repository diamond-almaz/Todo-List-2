import React from 'react';
import className from 'classnames'
import './List.scss'
import Badge from "../Badge";
import removeSvg from '../../assets/img/remove.svg'


function List({items,isRemovable,onClick,onRemove,onClickItem,activeItem}) {

    const questionBeforeRemoveList=(id)=>{
        if (window.confirm('Вы точно хотите удалить список?')) onRemove(id)
    }



    return (
        <ul onClick={onClick} className="list">
            {items && items.map((i,index) => {
                return <li onClick={onClickItem ? ()=>onClickItem(i) : null} key={index} className={className(i.className,{'active':  i.active && !activeItem || activeItem  && i.id===activeItem.id})}>
                    <i>{i.icon ? i.icon : (<Badge color={i.color.name}/>)}</i>
                    <span>{i.name} {i.tasks && `(${i.tasks.length})`}</span>
                    {isRemovable&&<img onClick={()=>questionBeforeRemoveList(i.id)} className={'list__remove-icon'} src={removeSvg} alt="remove icon"/>}

                </li>
            })}
        </ul>
    );
}

export default List;