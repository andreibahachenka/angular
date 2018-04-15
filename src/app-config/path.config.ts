export const PathConfig = {
    mainPath: 'http://46.30.42.15:8066/v1/admin',

    //users
    authEndpoint: 'http://46.30.42.15:8066/v1/admin/auth',
    getUsersEndpoint: 'http://46.30.42.15:8066/v1/admin/users',
    createUserEndpoint: 'http://46.30.42.15:8066/v1/admin/users/create',
    updateUserEndpoint: 'http://46.30.42.15:8066/v1/admin/users/update',
    removeUserEndpoint: 'http://46.30.42.15:8066/v1/admin/users/remove',

    //administrators
    getAdministratorsEndpoint: 'http://46.30.42.15:8066/v1/admin/',
    createAdministratorEndpoint: 'http://46.30.42.15:8066/v1/admin/create',
    updateAdministratorEndpoint: 'http://46.30.42.15:8066/v1/admin/update',
    removeAdministratorEndpoint: 'http://46.30.42.15:8066/v1/admin/remove',

    //lotteries
    getLotteriesEndpoint: 'http://46.30.42.15:8066/v1/admin/lotteries?limit=limit&offset=offset',
    createLotteryEndpoint: 'http://46.30.42.15:8066/v1/admin/lottries/create',
    updateLotteryEndpoint: 'http://46.30.42.15:8066/v1/admin/lotteries/update',
    removeLotteryEndpoint: 'http://46.30.42.15:8066/v1/admin/lotteries/remove'
};