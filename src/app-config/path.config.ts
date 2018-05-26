const mainPath = 'http://jticonnect.pr3.eu:8066';
export const PathConfig = {
    mainPath: `${mainPath}/v1/admin`,

    //users
    authEndpoint: `${mainPath}/v1/admin/auth`,
    getUsersEndpoint: `${mainPath}/v1/admin/users`,
    createUserEndpoint: `${mainPath}/v1/admin/users/create`,
    updateUserEndpoint: `${mainPath}/v1/admin/users/update`,
    removeUserEndpoint: `${mainPath}/v1/admin/users/remove`,

    //Administrators
    getAdministratorsEndpoint: `${mainPath}/v1/admin/`,
    createAdministratorEndpoint: `${mainPath}/v1/admin/create`,
    updateAdministratorEndpoint: `${mainPath}/v1/admin/update`,
    removeAdministratorEndpoint: `${mainPath}/v1/admin/remove`,

    //Lotteries
    getLotteriesEndpoint: `${mainPath}/v1/admin/lotteries`,
    createLotteryEndpoint: `${mainPath}/v1/admin/lotteries/create`,
    updateLotteryEndpoint: `${mainPath}/v1/admin/lotteries/update`,
    removeLotteryEndpoint: `${mainPath}/v1/admin/lotteries/remove`,

    //Image converter
    uploadImageEndpoint: `${mainPath}/v1/services/photo/upload`,

    //Get cities
    getCityEndpoint: `${mainPath}/v1/services/cities`,

    //Quizzes
    getQuizzesEndpoint: `${mainPath}/v1/admin/quizzes`,
    createQuizEndpoint: `${mainPath}/v1/admin/quizzes/create`,
    updateQuizEndpoint: `${mainPath}/v1/admin/quizzes/update`,

    //Special quizzes
    getSpecialQuizzesEndpoint: `${mainPath}/v1/admin/quizzes/special`,
    createSpecialQuizEndpoint: `${mainPath}/v1/admin/quizzes/special/create`,
    updateSpecialQuizEndpoint: `${mainPath}/v1/admin/quizzes/special/update`,
    sendSpecialQuizEndpoint: `${mainPath}/v1/admin/quizzes/special/send`,

    //Games
    getGamesEndpoint: `${mainPath}/v1/admin/games`,

    //Orders
    getOrdersEndpoint: `${mainPath}/v1/admin/orders`,
    createOrderEndpoint: `${mainPath}/v1/admin/orders/create`,
    removeOrderEndpoint: `${mainPath}/v1/admin/orders/remove`,

    //Prizes
    getPrizesEndpoint: `${mainPath}/v1/admin/products`,
    createPrizeEndpoint: `${mainPath}/v1/admin/product/create`,
    updatePrizesEndpoint: `${mainPath}/v1/admin/product/update`,

    //Settings
    getSettingsEndpoint: `${mainPath}/v1/admin/settings`,
    updateSettingEndpoint: `${mainPath}/v1/admin/settings/update`
};