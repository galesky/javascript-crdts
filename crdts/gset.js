/**
 * Grow-Only Set CRDT
 */

 class GSet {
    state = new Set()
    constructor(state) {
        if (state) {
            this.state = state
        }
    }
    
    merge(newState) {
        // LUB of a set is the join of two sets
        this.state = new Set([...this.state, ...newState])
    }

    value() {
        return this.state
    }
}

/**
 * simple test cases
 */

const gSet = new GSet()
gSet.merge(new Set([1,2,3]))
console.log(gSet.value())
gSet.merge(new Set([1,2,3,4]))
console.log(gSet.value())
gSet.merge(new Set([1,2]))
console.log(gSet.value())
gSet.merge(new Set([6]))
console.log(gSet.value())