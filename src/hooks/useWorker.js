import { useState } from 'react'
import { groupBy } from 'lodash'
import useAuth from './useAuth'

export default useWorker = accounts => {
    const { get } = useAuth()
    const [workers, setWorkers] = useState([])

    const load = () => Promise.resolve()
        .then(() => get('miningworkers'))
        .then(workers => setWorkers(
            // Store workers owned by designated mining accounts.
            workers.filter(worker => accounts.indexOf(worker.miningAccount.id) != -1)
        ))

    const getWorkers = () => get('Workers')
        .then(res => {
            // setWorkers(res)
            return res
        })

    const getWorkerPools = () => Promise.resolve()
        .then(() => workers || getWorkers())
        .then(workers => groupBy(workers, el => el.miningPool ? el.miningPool.id : -1 ))

    return {
        workers,
        load,
        getWorkers,
        getWorkerPools
    }
}