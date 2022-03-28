import {useState} from 'react'
// importing some react icons 
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import './index.css'

const Items = props => {
    // importing some props 
    const{ data,toggleCheckBox,deleteItem,editingAnUserValues }= props
    const {id,email,checked,name,role} = data
    // setting editing state for modifying data
    const [edit,setEdit] = useState("false")
    // setting name value using state
    const [nameValue,setNameValue] = useState(name)
    // setting email value using state
    const [emailValue,setEmailValue] = useState(email)
    // setting role value using state
    const [roleValue,setRoleValue] = useState(role)
    
    // function to handle checkbox toggle change
    const toggle = () => {
        toggleCheckBox(id)
    }

    // function to delete item 
    const deletingItem = () => {
        deleteItem(id)
    }

    // function to edit the user variables
    const onClickEdit = () => {
        
        setEdit(true)
    }

    const onChangeNameValue = event => {
        setNameValue(event.target.value)
    }

    const onChangeEmailValue = event => {
        setEmailValue(event.target.value)
    }

    const onChangeRoleValue = event => {
        setRoleValue(event.target.value)
    }

    // function to save the edited values
    const onClickSaveButton = () => {
        editingAnUserValues(id,nameValue,emailValue,roleValue)
        setEdit(false)
    }
    

    return (
        <>
        
        {
            edit === true ? (
            <>
            <div className="edit-container" >
                    <input value={nameValue} onChange={onChangeNameValue}  type="text" className="input-box" />
                    <input value={emailValue} onChange={onChangeEmailValue} type="text" className="input-box" />
                    <input value={roleValue} onChange={onChangeRoleValue} type="text" className="input-box" />
                    <button onClick={onClickSaveButton} type="button" className="save-button">save</button>
            </div>
            <hr className="horizantal-line" />
            </>
            ) : (<> 
            <li className="item-container" >
            <div className="box-1" >
            <input checked={checked} onChange={toggle} className="check-box" type="checkbox" />
            </div>
            <div className="box-2" >
                <p className="name" >{name}</p>
            </div>
            <div className="box-2" >
                <p className="name" >{email}</p>
            </div>
            <div className="box-2" >
                <p className="name" >{role}</p>
            </div>
            <div className="icons-box" >
                <AiOutlineEdit onClick={onClickEdit} className="icon" />
                <AiOutlineDelete onClick={deletingItem} className="icon" />
            </div>
        </li>
        <hr className="horizantal-line" />
            </>)
        }
        </>
    )
}


export default Items