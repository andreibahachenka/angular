const mainPath = 'https://jticonnect.pr3.eu:8067';
// const mainPath = 'http://localhost:8066';
export const PathConfig = {
    mainPath: `${mainPath}/v1/admin`,

    //users
    authEndpoint: `${mainPath}/v1/admin/auth`,
    getUsersEndpoint: `${mainPath}/v1/admin/users`,
    getUsersXLSXEndpoint: `${mainPath}/v1/admin/users/xlsx`,
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
    removeQuizEndpoint: `${mainPath}/v1/admin/quizzes/remove`,

    //Special quizzes
    getSpecialQuizzesEndpoint: `${mainPath}/v1/admin/quizzes/special`,
    getSpecialQuizzesListEndpoint: `${mainPath}/v1/admin/quizzes/special/list`,
    createSpecialQuizEndpoint: `${mainPath}/v1/admin/quizzes/special/create`,
    updateSpecialQuizEndpoint: `${mainPath}/v1/admin/quizzes/special/update`,
    sendSpecialQuizEndpoint: `${mainPath}/v1/admin/quizzes/special/send/all`,
    sendSpecialQuizUserEndpoint: `${mainPath}/v1/admin/quizzes/special/send/user`,

    //Games
    getGamesEndpoint: `${mainPath}/v1/admin/games`,

    //Orders
    getOrdersEndpoint: `${mainPath}/v1/admin/orders`,
    createOrderEndpoint: `${mainPath}/v1/admin/orders/create`,
    removeOrderEndpoint: `${mainPath}/v1/admin/orders/remove`,

    //Presents
    getPresentsEndpoint: `${mainPath}/v1/admin/products`,
    createPresentEndpoint: `${mainPath}/v1/admin/products/create`,
    updatePresentEndpoint: `${mainPath}/v1/admin/products/update`,
    removePresentEndpoint: `${mainPath}/v1/admin/products/remove`,

    //Settings
    getSettingsEndpoint: `${mainPath}/v1/admin/settings`,
    updateSettingEndpoint: `${mainPath}/v1/admin/settings/update`,

    //Reports
    getSpecialQuizzesReportEndpoint: `${mainPath}/v1/admin/reports/special`,
    downloadSpecialQuizzesReportEndpoint: `${mainPath}/v1/admin/reports/special/xlsx`,
    getGamesReportEndpoint: `${mainPath}/v1/admin/reports/games`,
    downloadGamesReportEndpoint: `${mainPath}/v1/admin/reports/games/xlsx`,
    getLotteriesReportEndpoint: `${mainPath}/v1/admin/reports/lotteries`,
    downloadLotteriesReportEndpoint: `${mainPath}/v1/admin/reports/lotteries/xlsx`,
    getOrdersReportEndpoint: `${mainPath}/v1/admin/reports/orders`,
    downloadOrdersReportEndpoint: `${mainPath}/v1/admin/reports/orders/xlsx`,
    getRatingsReportEndpoint: `${mainPath}/v1/admin/reports/ratings`,
    downloadRatingsReportEndpoint: `${mainPath}/v1/admin/reports/ratings/xlsx`,
    getUsersReportEndpoint: `${mainPath}/v1/admin/reports/users`,
    downloadUsersReportEndpoint: `${mainPath}/v1/admin/reports/users/xlsx`,

    //Chat
    getChatsEndpoint: `${mainPath}/v1/admin/chats`,
    getMessagesEndpoint: `${mainPath}/v1/admin/messages`,
    sendMessageEndpoint: `${mainPath}/v1/admin/messages/send`,
    sendMessageAllEndpoint: `${mainPath}/v1/admin/messages/send/all`,
    markChatEndpoint: `${mainPath}/v1/admin/chats/mark`,

    //Logs
    getLogsEndpoint: `${mainPath}/v1/admin/logs`,
    addLogEndpoint: `${mainPath}/v1/admin/logs/create`,

    //Quests
    getQuestsEndpoint: `${mainPath}/v1/admin/quests`,
    createQuestEndpoint: `${mainPath}/v1/admin/quests/create`,
    updateQuestEndpoint: `${mainPath}/v1/admin/quests/update`,
};