import { useEffect, useState } from 'react'
import { groupBy, merge, mergeWith } from 'lodash'
import useAuth from './useAuth'

export default useHashrate = () => {
    const { get } = useAuth()

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
                    (dict, worker) => ({ 
                        ...dict,
                        [worker.miningAccount.id]: dict[worker.miningAccount.id]
                            ? mergeWith(dict[worker.miningAccount.id], workerHashRates[worker.id], addHashRates)
                            : workerHashRates[worker.id]
                    }),
                    {}
                )
            )
        )

    const addHashRates = (objValue, srcValue) => ({
        ...srcValue,
        current: srcValue.current + objValue.current,
        average: srcValue.average + objValue.average,
        reported: srcValue.reported + objValue.reported
    })

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

    const mergePoolsHashRate = poolsHashRate => 
        Object.values(poolsHashRate)
            .reduce(
                (acc, hashRates) =>
                    acc.length == 0
                        ? hashRates
                        : mergeWith(acc, hashRates, addHashRates),
                []
            )

    // const getLatestHashrateTotal = hashrateGroup => Object.values(hashrateGroup)
    //     .reduce(
    //         (total, hashrates) => {
    //             // Find the longer and shorter list between current and accumulated.
    //             const longer = total.length >= hashrates ? total : hashrates
    //             const shorter = total.length < hashrates ? hashrates : total
    //             // Add each of the shorter list to the longer list.
    //             return longer.map((el, i) => ({
    //                 current: el.current + (shorter[i] ? shorter[i].current : 0),
    //                 average: el.average + (shorter[i] ? shorter[i].average : 0),
    //                 reported: el.reported + (shorter[i] ? shorter[i].reported : 0),
    //                 created: el.created,
    //             }))
    //         },
    //         []
    //     )

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
        mergePoolsHashRate,
        getPoolTotal,
        readableHashrate,
        previewPools,
        previewWorkers
    }
}