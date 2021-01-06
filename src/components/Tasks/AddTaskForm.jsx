import React, {useState} from 'react';
import addSvg from './../../assets/img/add.svg'

function AddTaskForm({addTask, listId}) {

    const [visibleForm, setVisibleForm] = useState(true)
    const [inputValue, setInputValue] = useState('')

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const onAddTask = () => {
        addTask(listId, inputValue)
        toggleFormVisible()
    }

    return (
        <div className="tasks__form">
            {!visibleForm
                ?
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add Icon"/>
                    <span>Новая задача</span>
                </div>
                :
                <div className="tasks__form-block">
                    <input
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }}
                        value={inputValue}
                        className={'field'}
                        placeholder={'Текст задачи'}
                        type="text"/>
                    <div className={'tasks__form-block-btns'}>
                        <button onClick={onAddTask} className={'button'}>Добавить задачу</button>
                        <button onClick={toggleFormVisible} className={'button button--grey'}>Отмена</button>
                    </div>
                </div>
            }

        </div>
    );
}

export default AddTaskForm;