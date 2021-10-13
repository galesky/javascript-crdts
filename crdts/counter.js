/**
 * Counter CRDT
 * Does not guarantee positive invariant
 * 
 * Assumes 3 peers for simplicity
 */

class Counter {
    id = null
    state = [0,0,0]
    constructor(id) {
        this.id = id
    }

    merge(newState) {
        /**
         * LUB is the coordinate-wise max value
         */
        for (const peerId in this.state) {
            this.state[peerId] = Math.max(this.state[peerId], newState[peerId])
        }
    }

    incrementLocally (increment = 1) {
        this.state[this.id] += increment
    }
    
    get value() {
        return this.state.reduce((curr,next) => curr + next)
    }
}

class CounterNetwork {
    counters = []

    /**
     * Counter factory
     */
    createCounter () {
        const newCounter = new Counter(this.counters.length)
        this.counters.push(newCounter)
        return newCounter
    }

    syncPeers () {
        for (const source of this.counters) {
            for (const target of this.counters) {
                if (source.id === target.id) continue
                target.merge(source.state)
            }
        }
    }
}

/**
 * Create peers
 */
const network = new CounterNetwork()
const counterA = network.createCounter()
const counterB = network.createCounter()
const counterC = network.createCounter()

/**
 * Play with values
 * order does not matter
 */
counterA.incrementLocally(2)
counterB.incrementLocally(3)
counterC.incrementLocally(4)
// pre sync values
console.log('# Pre Sync Values #')
console.log(counterA.value)
console.log(counterB.value)
console.log(counterC.value)
// Sync all
network.syncPeers()
// post sync values
console.log('# Post Sync Values #')
console.log(counterA.value)
console.log(counterB.value)
console.log(counterC.value)

