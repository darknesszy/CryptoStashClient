import React, { useState } from 'react'

export default useUser = props => {
    const [account, useAccount] = useState({})



    return {
        isLoggedIn: false,
        name: account.name
    }
}