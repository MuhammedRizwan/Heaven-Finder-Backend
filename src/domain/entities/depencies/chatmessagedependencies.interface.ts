import IChatmessageRepository from "../repository/chatmessagerepository.interface";
import IUserRepository from "../repository/userrepository.interface";
import IChatmessageUseCase from "../usecase/chatmessageusecase.interface";

export default interface IChatmessageUsecaseDependencies {
    Repositories: {
        ChatRepository: IChatmessageRepository;
        UserRepository: IUserRepository
    };
}

export interface IChatmessageControllerDependencies {
    ChatmessageUseCase: IChatmessageUseCase;
}