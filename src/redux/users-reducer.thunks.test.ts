import { APIResponseType, ResultCodesEnum } from './../api/api';
import { usersAPI } from '../api/users-api';
import { actions, follow, unfollow } from './users-reducer';
jest.mock('../api/users-api')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType ={
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: [],
}



const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test("success follow thunk", async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
test("success unfollow thunk", async () => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})