import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useBlockchain = () => {
    const { get } = useAuth()
    const [blockchains, setBlockchains] = useState({})

    useEffect(() => {
        load()
    }, [])

    const load = () => get('blockchains')
        .then(blockchains => blockchains.reduce((dict, blockchain) => 
            ({ ...dict, [blockchain.id]: blockchain }), {})
        )
        .then(blockchains => setBlockchains(blockchains))

    const getTokenBlockchains = blockchains => Object.values(blockchains)
        .reduce(
            (acc, blockchain) => ({
                ...acc,
                [blockchain.nativeToken.id]: blockchain
            }),
            {}
        )

    return {
        blockchains,
        load,
        getTokenBlockchains
    }
}