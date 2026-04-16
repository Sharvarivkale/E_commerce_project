import React from 'react'

const Categoryform = ({handleSubmit,Name,setName}) => {


  return (
   <>
   <h5>Create Category</h5>
   <form onSubmit={handleSubmit} className='w-50'>
     <div className="mb-3">

       <input type="text" className="form-control" id="categoryName" placeholder='Category Name' value={Name}
        onChange={(e) => setName(e.target.value)} />
     </div>
     <button type="submit" className="btn btn-primary" >Create</button>
   </form>
   </>
  )
}

export default Categoryform