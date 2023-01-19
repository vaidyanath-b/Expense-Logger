
export default function NavBar(){

    return(
        <div className="flex gap-3 justify-between p-3 bg-stone-400">
            <h1>Logo</h1>
            <button 
              className='bg-red-500 mr-4 p-1'
              onClick={(e)=>{
                auth.signOut();
                router.push('/login')
              }}>Logout</button>
        </div>


            )
}