import React,{useState} from "react";
import List from "../List";
import './addListButton.scss'
import Badge from "../Badge";
import closeSvg from '../../assets/img/close.svg'

const AddListButton = ({colors,onAddList }) => {
    let [visiblePopup,setvisiblePopup]=useState(false)
    let [selectedColor, selectColor]=useState(colors[0].id)
    let [inputValue,setInputValue]=useState('')

    const onClose=()=>{
        setInputValue('')
        setvisiblePopup(false)
        selectColor(colors[0].id)
    }

    const addList=()=>{
        if (!inputValue) { alert('Чтобы дабавить задачу введите название.'); return}
        onAddList({id: Math.random(), name: inputValue, color: colors.find(i=>i.id==selectedColor).name })
        onClose()

    }
    return (
        <div  className={'add-list'}>
        <List onClick={()=> {
            if (visiblePopup) onClose()
            setvisiblePopup(!visiblePopup)
        }}  items={[
            {
                className: 'list__add-button',
                icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                name: 'Добавить список'
            }
        ]}/>
            {visiblePopup&&<div className={'add-list__popup'}>
                <img src={closeSvg} onClick={onClose} className={'add-list__popup-close-btn'} alt="Close button"/>
                <input onChange={(e)=>setInputValue(e.target.value)} value={inputValue} className={'field'} placeholder={'Название списка'} type="text"/>
                <div className={'add-list__popup-color'}>
                        {colors.map(i=><Badge className={selectedColor==i.id && 'active'} onClick={()=>{selectColor(i.id)}}  key={i.id} color={i.name}/>)}

                </div>
                <button onClick={addList} className={'button'}>Добавить</button>

            </div>}
        </div>
    );
};
export default AddListButton;