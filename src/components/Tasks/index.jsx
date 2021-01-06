import React from 'react';
import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'

const Tasks = ({lists,updateListName}) => {
    console.log('tasks')
    const showFromUpdate=()=>{
        let newTitle=prompt('Введите пожалуйста название', lists.name)
        if (newTitle && newTitle!=lists.name) {
            updateListName(lists.id,newTitle)
        }
    }
    return (<div className="tasks">
            <h2 className={'tasks__title'}>
                {lists.name}
                <img onClick={showFromUpdate} src={editSvg} alt='Edit icon'/>
            </h2>
            <div className="tasks__items">

                {lists.tasks.length > 0 ? lists.tasks.map(i => {
                    return <div key={i.id} className="tasks__items-row">
                        <div className={'checkbox'}>
                            <input id={`task-${i.id}`} type="checkbox"/>
                            <label htmlFor={`task-${i.id}`}>
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="black"
                                          stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </label>
                        </div>
                        <input readOnly type="text" value={i.text}/>
                    </div>

                }) : <h2>Задачи отcутcтвуют</h2>}

            </div>
        </div>
    );
}

export default Tasks;