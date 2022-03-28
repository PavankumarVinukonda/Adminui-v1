import ReactPaginate from "react-paginate";
import './index.css'


const Paginate = props => {
// importing props
const {empList,pageClick} = props

// setting usersPerpage
const usersInPage = 10
const totalUsers = empList.length
const totalPages = Math.round(totalUsers / usersInPage)

     
// this function is called when we click on the pagination page number
const handlePageClick = (data) => {
      pageClick(data.selected)
};

    

    return(
    <div >
    <ReactPaginate 
      previousLabel={"<"}
      breakLabel={"..."}
      pageCount={totalPages}
      nextLabel={">"}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName="pagination-container"
      activeClassName="active-item"
      previousLinkClassName="previus-className"
      nextLinkClassName="previus-className"
      
    />
  </div>
)}

export default Paginate;