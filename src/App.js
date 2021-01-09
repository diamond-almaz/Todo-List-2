import React, {useEffect} from 'react'
import List from "./components/List";
import AddListButton from "./components/AddListButton";
// import DB from '../src/assets/db.json'
import Tasks from "./components/Tasks";
import axios from "axios";
import {Route, useHistory} from 'react-router-dom'

// data.map(item => {
//     item.color = item.color.name;
//     return item
// }

function App() {


    let [lists, setLists] = React.useState(null);
    let [colors, setColors] = React.useState(null)
    let [activeItem,setactiveItem]=React.useState(null)

    let history = useHistory();

    useEffect(()=>{
        if (lists) setactiveItem(lists.find(i=>i.id==history.location.pathname.split('/lists/')[1]))
    },[lists,history.location.pathname])

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data);
        });

        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data);
        });
    }, [])

    //Функция для добавления задачи. Принимает
    const onAddList = (obj) => {
        setLists([...lists, obj])
        console.log('добален', obj)
    }

    //Функция для удаления списка задач. Параметры: id - идентификатор списка задач.
    const onRemoveList = (id) => {
        setLists(lists.filter(i => i.id != id))
        axios.delete(`http://localhost:3001/lists/${id}`).then(()=>{
        })
    }

    // Функция, позволяющая переименовать название списка задач. Параметры: id - идентификатор списка задач, newTitle - новая строка
    const updateListName=(id, newTitle)=>{
        console.log('Функция updateListName')
        const newObj=[...lists]
        newObj.find(i=>i.id==id).name=newTitle
        setLists(newObj)
        axios.patch('http://localhost:3001/lists/'+id,{name: newTitle}).catch(()=>alert('Не получилось обновить название списка'))
    }

    // Функция для добавления задачи
    const addTask=(listId, text)=>{
        const obj={listId, text, "completed": false }
        debugger;
        axios.post('http://localhost:3001/tasks', obj).then((i)=> {
            const newList=lists.map(list=>{
                if (list.id==listId) {
                    list.tasks=[...list.tasks,{...obj,id: i.data.id}]
            }
                return list
            })
            setLists(newList)

        })

    }

    //Функция для удаления задачи
    const onRemoveTask=(listId,id)=>{
        console.log(listId,id)
        if (window.confirm('Вы действительно хотите удалить задачу?')) {
            const newArr = lists.map(i => {
                if (i.id === listId) {
                    i.tasks = i.tasks.filter(i => i.id != id)
                }
                return i
            })
            setLists(newArr)
            axios.delete(`http://localhost:3001/tasks/${id}`).catch(() => alert('Не удалось удалить задачу'))
        }
    }

    //Функция для того, чтобы поменять свойство текст задачи
    const onEditTask=(listId,taskObj)=>{
        const newText=prompt('Переименуйте задачу',taskObj.text)
        if (!newText) {
            return
        }
        const newList=lists.map(item=>{
            if (item.id===listId) {
                item.tasks=item.tasks.map(task=>{
                    if (task.id===taskObj.id) {
                        task.text=newText
                    }
                    return task
                })
            }
                return item
        })
        setLists(newList)
        axios.patch(`http://localhost:3001/tasks/${taskObj.id}`,{text: newText}).catch(()=>alert('Задача не обновилась'))
    }

    //Функция для того, чтобы поменять свойство completed у задачи
    const onChangeCompletedTask=(id, checked, listId)=>{
        const newList=lists.map(item=>{
            if (item.id===listId) {
                item.tasks=item.tasks.map(task=>{
                    if (task.id===id) {
                        task.completed=checked
                    }
                    return task
                })
            }
            return item
        })
        setLists(newList)
        axios.patch(`http://localhost:3001/tasks/${id}`, {completed: checked}).catch(()=>alert('Не удалось отметить задачу'))
    }



    return (
        <div className="todo">
            <div className={'todo__sidebar'}>
                <List onClickItem={()=>{history.push('/'); setactiveItem(null)}} items={[
                    {
                        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                                fill="black"/>
                        </svg>,
                        name: 'Все задачи',
                        active: !activeItem
                    }
                ]}/>
                <List onClickItem={(i)=>{
                    history.push(`/lists/${i.id}`)
                    setactiveItem(i)
                }} items={lists} onRemove={onRemoveList} activeItem={activeItem && activeItem} isRemovable/>
                <AddListButton onAddList={onAddList} colors={colors}/>
            </div>
            <div className={'todo__tasks'}>
                <Route exact path='/'>
                    {lists && lists.map(i=>{
                       return <Tasks
                           onChangeCompletedTask={onChangeCompletedTask}
                           key={i.id}
                           onEditTask={onEditTask}
                           onRemoveTask={onRemoveTask}
                           addTask={addTask}
                            updateListName={updateListName}
                            lists={i}
                            withoutEmpty/>
                    })}
                </Route>
                <Route path='/lists/:id'>
                    {lists && activeItem && <Tasks
                        onChangeCompletedTask={onChangeCompletedTask}
                        onEditTask={onEditTask}
                        onRemoveTask={onRemoveTask}
                        addTask={addTask}
                        updateListName={updateListName}
                        lists={activeItem}/>}
                </Route>

                {/*{activeItem && lists &&*/}
                {/*<Tasks*/}
                {/*    addTask={addTask}*/}
                {/*    updateListName={updateListName}*/}
                {/*    lists={activeItem }/>}*/}
            </div>

        </div>
    );
}

export default App;
