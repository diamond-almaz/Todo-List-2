import React, {useState, useEffect} from "react";
import List from "../List";
import './addListButton.scss'
import Badge from "../Badge";
import closeSvg from '../../assets/img/close.svg'
import axios from "axios";

const AddListButton = ({colors, onAddList}) => {

    let [visiblePopup, setvisiblePopup] = useState(false)
    let [selectedColor, selectColor] = useState(null)
    let [inputValue, setInputValue] = useState('')
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) selectColor(colors[0].id)

    }, [colors])

    const onClose = () => {
        setInputValue('')
        setvisiblePopup(false)
        selectColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Чтобы дабавить задачу введите название.');
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor})
            .then(({data}) => {
                const color=colors.find(i => i.id === selectedColor)
                const listObj = {...data, color: {name: color.name, hex: color.hex}}
                onAddList(listObj)
            }).finally(() => {
            onClose()
            setIsLoading(false)
        })
    }

    return (
        <div className={'add-list'}>
            <List onClick={() => {
                if (visiblePopup) onClose()
                setvisiblePopup(!visiblePopup)
            }}

                  items={[
                {
                    className: 'list__add-button',
                    icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>,
                    name: 'Добавить список'
                }
            ]}/>

            {visiblePopup && <div className={'add-list__popup'}>
                <img src={closeSvg} onClick={onClose} className={'add-list__popup-close-btn'} alt="Close button"/>
                <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} className={'field'}
                       placeholder={'Название списка'} type="text"/>
                <div className={'add-list__popup-color'}>
                    {colors.map(i => <Badge className={selectedColor == i.id && 'active'} onClick={() => {
                        selectColor(i.id)
                    }} key={i.id} color={i.name}/>)}

                </div>
                <button onClick={addList} className={'button'}>{isLoading ? 'Добавление' : 'Добавить'}</button>

            </div>}
        </div>
    );
};
export default AddListButton;