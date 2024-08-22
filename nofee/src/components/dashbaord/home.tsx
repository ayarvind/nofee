import React from 'react'
import Main from './Main'
import Sidebar from '@/layout/Sidebar'

function home() {
  
  return (
   <>
        <div className='flex justify-evenly gap-4 p-3 mt-3'>
          <Sidebar/>
            <Main/>
        </div>
    </>
  )
}

export default home