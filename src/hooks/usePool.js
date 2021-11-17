import { merge } from 'lodash'
import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default usePool = () => {
    const { isSignedIn, pubGet, get, post, del } = useAuth()
    const [pools, setPools] = useState({})
    const [hashRates, setHashRates] = useState({})

    // useEffect(() => {
    //     if(isSignedIn) {
    //         pools || getPools()
    //     } else {
    //         setPools([])
    //     }
    // }, [isSignedIn])

    useEffect(() => {
        getPools()
    }, [])

    const getPools = () => Promise.resolve()
        .then(() => pubGet('miningpools'))
        .then(pools => {
            poolDict = pools.reduce((dict, pool) => ({ ...dict, [pool.id]: pool }), {})
            setPools(poolDict)
            // setPools(pools.map(pool => ({ ...pool, name: `${capitalize(pool.name)} Pool` })))
            return poolDict
        })

    const getHashRates = () => Promise.resolve()
        .then(() => get('miningworkers'))
        .then(workers => 
            Promise.all(
                workers.map(worker => 
                    get(`miningworkers/${worker.id}/hashrates`)
                        .then(hashRates => [worker.id, hashRates])
                )
            )
            .then(workerIdHashRatePairs => 
                workerIdHashRatePairs.reduce(
                    (dict, [workerId, hashRates]) => ({ ...dict, [workerId]: hashRates }),
                    {}
                )
            )
            .then(workerHashRates => 
                workers.reduce(
                    (dict, worker) => {
                        return ({ 
                            ...dict,
                            [worker.miningAccount.id]: dict[worker.miningAccount.id]
                            ? merge(dict[worker.miningAccount.id], workerHashRates[worker.id])
                            : workerHashRates[worker.id]
                        })
                    },
                    {}
                )
            )
        )
        .then(poolHashRates => setHashRates(poolHashRates))

    const combineHashRates = (acc, hashRates) => {
        base = acc.length >= hashRates.length ? acc : hashRates
        target = acc.length < hashRates.length ? hashRates : acc
        Object.merge()
        base.forEach((hashRate, i) => ({
            current: hashRate + target[i]
        }))
    }

    const addAccount = (poolId, owner, identifier) => Promise.resolve()
        .then(() => post(`miningaccounts`, { identifier, owner, miningPool: pools[poolId] }))

    const removeAccount = (id) => Promise.resolve()
        .then(() => del(`poolbalances/${id}`))

    return {
        pools,
        getPools,
        addAccount,
        removeAccount,
        getHashRates,
        hashRates
    }
}