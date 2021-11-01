import { useState } from 'react'
import useAuth from './useAuth'

export default usePool = () => {
    const { get } = useAuth()
    const [wallets, setWallets] = useState()

    const getWallets = () => get('wallets')
        .then(wallets => wallets.reduce((acc, wallet) => ({ ...acc, [wallet.address]: wallet }), {}))
        .then(res => {
            setWallets(res)
            return res
        })

    return {
        wallets,
        getWallets
    }
}