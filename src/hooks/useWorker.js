import { useState } from 'react'
import { groupBy } from 'lodash'
import useAuth from './useAuth'

export default useWorker = () => {
    const { get } = useAuth()
    const [workers, setWorkers] = useState()

    const getWorkers = () => get('Workers')
        .then(res => {
            setWorkers(res)
            return res
        })

    const getWorkerPools = () => Promise.resolve()
        .then(() => workers || getWorkers())
        .then(workers => groupBy(workers, el => el.miningPool ? el.miningPool.id : -1 ))

    return {
        workers,
        getWorkers,
        getWorkerPools
    }
}