import { useEffect, useState } from 'react'
import { groupBy } from 'lodash'
import useAuth from './useAuth'

export default useHashrate = () => {
    const { isSignedIn, get } = useAuth()
    const [workers, setWorkers] = useState()
    // Group of hashrate list paired to worker id.
    const [hashrateGroup, setHashrateGroup] = useState()

    // useEffect(() => {
    //     if(isSignedIn) {
    //         workers || getWorkers()
    //         hashrateGroup || getHashrates()
    //     } else {
    //         setWorkers(null)
    //         setHashrateGroup(null)
    //     }
    // }, [isSignedIn])

    const previewPools = () => Promise.resolve()
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

    const previewWorkers = workers => Promise.resolve()
        .then(() =>
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
        )

    const getWorkers = () => get('Workers')
    .then(res => {
        setWorkers(res)
        return res
    })

    const getHashrates = () => Promise.resolve()
        // Get list of user's workers.
        .then(() => workers || getWorkers())
        // Fetch hashrates of each worker.
        .then(workers => Promise.all(
            workers.map(worker => 
                get(`workers/${worker.id}/hashrates`)
                    // Assign each hashrate list to a worker id key.
                    .then(hashrates => ({ [worker.id]: hashrates }))
            )
        ))
        .then(workerHashrates => {
            // Promise all can in a list of key value pair objects, so we join them into a single object.
            const hashrateGroup = workerHashrates.reduce((acc, hashrates) => ({ ...acc, ...hashrates }), {})
            setHashrateGroup(hashrateGroup)
            return hashrateGroup
        })

    const getLatestHashrateTotal = hashrateGroup => Object.values(hashrateGroup)
        .reduce(
            (total, hashrates) => {
                // Find the longer and shorter list between current and accumulated.
                const longer = total.length >= hashrates ? total : hashrates
                const shorter = total.length < hashrates ? hashrates : total
                // Add each of the shorter list to the longer list.
                return longer.map((el, i) => ({
                    current: el.current + (shorter[i] ? shorter[i].current : 0),
                    average: el.average + (shorter[i] ? shorter[i].average : 0),
                    reported: el.reported + (shorter[i] ? shorter[i].reported : 0),
                    created: el.created,
                }))
            },
            []
        )

    const getPoolTotal = (hashrateGroup, workers) => {
        const workerPools = groupBy(workers, el => el.miningPool ? el.miningPool.id : -1 )
        return Object.keys(workerPools)
            .reduce(
                (poolHashrates, workerPoolKey) => ({
                    ...poolHashrates,
                    [workerPoolKey]: workerPools[workerPoolKey]
                        .reduce((total, worker) => ({
                            current: total.current + hashrateGroup[worker.id][hashrateGroup[worker.id].length - 1].current,
                            average: total.average + hashrateGroup[worker.id][hashrateGroup[worker.id].length - 1].average,
                            reported: total.reported + hashrateGroup[worker.id][hashrateGroup[worker.id].length - 1].reported
                        }), { current: 0, average: 0, reported: 0 })
                }),
                {}
            )
    }

    const readableHashrate = hashrate => hashrate > 1000000000
        ? `${(hashrate / 1000000000).toFixed(3) } Gh/s`
        : `${(hashrate / 1000000).toFixed(2) } Mh/s`
 
    return {
        workers,
        hashrateGroup,
        getHashrates,
        getLatestHashrateTotal,
        getPoolTotal,
        readableHashrate,
        previewPools,
        previewWorkers
    }
}