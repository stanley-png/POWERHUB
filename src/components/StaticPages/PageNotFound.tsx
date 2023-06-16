import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
      <main className='flex justify-center flex-col text-center min-h-[55vh]'>
        <h1 className='text-2xl md:text-4xl font-bold mb-7'>Page Not Found</h1>
        <p>Go back <p onClick={() => navigate("/")} className='text-[#C1224F] underline cursor-pointer'>home</p>  </p>
      </main>
    )
  }
  
  export default PageNotFound