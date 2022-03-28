import {TailSpin} from "react-loader-spinner";
import {useState,useEffect} from 'react'
import Item from '../Items'
import Paginate from '../pagination'
import './index.css'

const apiStatus = {
    success: 'SUCCESS',
    inProgress: 'INPROGRESS',
    failure:'FAILURE',
}

const Home = () => {
    //  setting users data using state
    const [empData,setEmpData] = useState([])
    // setting starting number of page using state
    const [startingNumber,setStartingNumber] = useState(1) 
    // setting search value using state
    const [searchValue,setSearchValue] = useState('')
   // setting search data using state
    const [searchData,setSearchData] = useState([])
   // setting apiStatus
    const [apiCurrentStatus,setApiStatus] = useState(apiStatus.inProgress)

    // this will handle the functions when component mounts
    useEffect ( () => {
            getData()   
    },[])

    // this function is used to get the data from the given url using fetch
    const getData = async () => {

        setApiStatus(apiStatus.inProgress)
        const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
            
            if (response.ok ) {
            const responseData = await response.json()
            const modifiedData = responseData.map(item => ({
                id:item.id,
                email:item.email,
                name:item.name,
                role:item.role,
                checked:false,
            }))

            setEmpData(modifiedData)
            setApiStatus(apiStatus.success)
            
            } else {
                console.log('fetch Error')
            } 
    }

    // Loader Component
    const renderLoader = () => <div className="loader-container" >
        <TailSpin  height="50px" width="50px" />
    </div>
     
    // this function handles the checkbox toggle
    const toggleCheckBox = id => {
        const modifiedData = empData.map(item => ({
            id:item.id,
            email:item.email,
            name:item.name,
            role:item.role,
            checked:item.id === id ? (!item.checked) : (item.checked),
        }))

        
        
        setEmpData(modifiedData)
        
    }
    
   // this function handles the deletiopn of selected items
    const deleteSelected = () => {
        const modifiedData = empData.filter(item => item.checked !== true)
        
        setEmpData(modifiedData)
        console.log(modifiedData)
       
    }

    // this function handles the deleting the item in the list
    const deleteItem = id => {
        const modifiedData = empData.filter(item => item.id !== id);
       
        setEmpData(modifiedData)
       
    }

    

    // this dunction handles the edting of user details
    const editingAnUserValues = (id,nameValue,emailValue,roleValue) => {
        const modifiedData = empData.map(item =>({
            id:item.id,
            email:item.id === id ? (emailValue) : (item.email),
            name:item.id === id ? (nameValue) : (item.name),
            role:item.id === id ? (roleValue) : (item.role),
            checked:item.checked
        }))
        

        setEmpData(modifiedData)
        
    }

    // this function setes the startingNumber when the user clicks on the pagination number
    const PaginationPageClick = (number) =>{
        
        if (number >= 1) {
            setStartingNumber(number * 10 + 1)
            
        } else {
            setStartingNumber(number + 1)
        
        }

    }

    // this selects the all the checkboxes
    const selectAll = () => {
        const modifiedData = empData.map(item => ({ 
            id:item.id,
            email:item.email,
            name:item.name,
            role:item.role,
            checked:item.id >= startingNumber && item.id <= startingNumber + 9 ? (true) : (item.checked),
        }))

        setEmpData(modifiedData)
    }

    
    // this sets the currentItems data 

    const curretItem = empData.slice(startingNumber, startingNumber+9)
    
    // this function filters the list data according to the search input
    const onChangeSearchBar = event => {
        setApiStatus(apiStatus.inProgress)
        setSearchValue(event.target.value)
        let searchUserInput = event.target.value

        const modifiedData =  empData.filter(
            eachUser =>
              eachUser.name.toLowerCase().startsWith(searchUserInput.toLowerCase()) ||
              eachUser.email
                .toLowerCase()
                .startsWith(searchUserInput.toLowerCase()) ||
              eachUser.role.toLowerCase().startsWith(searchUserInput.toLowerCase()),
          )

          setSearchData(modifiedData)
          setApiStatus(apiStatus.success)
    }

    

    let filterdata = []
   
    if (searchValue !== '' ) {
        filterdata = searchData
    } else {
        filterdata = curretItem
    }

    
        
    return (

        <div className="bg-container" >
            <h1>Admin ui</h1>
            <input value={searchValue} placeholder="    Search" type="search" className="search-bar" onChange={onChangeSearchBar} />
            <ul className="emp-data-container">
            <li className="item-container" >
            <div className="box-1" >
            <input onClick={selectAll}  className="check-box" type="checkbox" />
            </div>
            <div className="box-2" >
                <p className="name" >Name</p>
            </div>
            <div className="box-2" >
                <p className="name" >Email</p>
            </div>
            <div className="box-2" >
                <p className="name" >Role</p>
            </div>
            <div className="icons-box" >
            <p className="name" >Actions</p>
            </div>
        </li>
        <hr className="horizantal-line" />
        
                {
                 apiStatus === apiStatus.inProgress ? (renderLoader()) : (
                    filterdata.map(item => <Item key={item.id} data={item} editingAnUserValues={editingAnUserValues} toggleCheckBox={toggleCheckBox} deleteItem={deleteItem} />)
                 )
                 }
        </ul>
        <div className="pagination-container-box" >
            <button onClick={deleteSelected} className="btn-delete-selected">
                Delete Selected
            </button>
            <Paginate pageClick={PaginationPageClick} className="pagination-container" empList={empData} />
        </div>
        </div>
    )
}

export default Home