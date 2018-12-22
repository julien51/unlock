import {
  addLock,
  createLock,
  deleteLock,
  lockDeployed,
  updateLock,
  withdrawFromLock,
  ADD_LOCK,
  CREATE_LOCK,
  DELETE_LOCK,
  LOCK_DEPLOYED,
  UPDATE_LOCK,
  WITHDRAW_FROM_LOCK,
} from '../../actions/lock'

describe('lock actions', () => {
  it('should create an action to create a lock', () => {
    const lock = {}
    const expectedAction = {
      type: CREATE_LOCK,
      lock,
    }
    expect(createLock(lock)).toEqual(expectedAction)
  })

  it('should create an action to update the lock', () => {
    const address = '0x1234'
    const update = {}
    const expectedAction = {
      type: UPDATE_LOCK,
      address,
      update,
    }
    expect(updateLock(address, update)).toEqual(expectedAction)
  })

  it('should create an action to add the lock', () => {
    const lock = {}
    const address = '0x123'
    const expectedAction = {
      type: ADD_LOCK,
      address,
      lock,
    }
    expect(addLock(address, lock)).toEqual(expectedAction)
  })

  it('should create an action to delete  lock', () => {
    const address = '0x123'
    const expectedAction = {
      type: DELETE_LOCK,
      address,
    }
    expect(deleteLock(address)).toEqual(expectedAction)
  })

  it('should create an action to withdraw from the lock', () => {
    const lock = {}
    const expectedAction = {
      type: WITHDRAW_FROM_LOCK,
      lock,
    }
    expect(withdrawFromLock(lock)).toEqual(expectedAction)
  })

  it('should create an action to indicate that a lock has been deployed', () => {
    const lock = {}
    const address = '0x1234'
    const expectedAction = {
      type: LOCK_DEPLOYED,
      lock,
      address,
    }
    expect(lockDeployed(lock, address)).toEqual(expectedAction)
  })
})
