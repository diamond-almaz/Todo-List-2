import React from 'react';
import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({lists,updateListName,addTask,withoutEmpty,onRemoveTask}) => {
     const showFromUpdate=()=>{
        let newTitle=prompt('Введите пожалуйста название', lists.name)
        if (newTitle && newTitle!=lists.name) {
            updateListName(lists.id,newTitle)
        }
    }
    return (<div className="tasks">
            <h2 style={{color: lists.color.hex}} className={'tasks__title'}>
                {lists.name}
                <img onClick={showFromUpdate} src={editSvg} alt='Edit icon'/>
            </h2>
            <div className="tasks__items">
                {lists.tasks && lists.tasks.length > 0 ? lists.tasks.map(i => {
                    return <Task onRemove={onRemoveTask} key={i.id} {...i}/>
                }) : !withoutEmpty && (<h2>Задачи отcутcтвуют</h2>)}
                <AddTaskForm listId={lists.id} addTask={addTask}/>

            </div>
        </div>
    );
}

export default Tasks;
