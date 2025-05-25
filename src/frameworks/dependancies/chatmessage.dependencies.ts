import ChatRepository from "../../adapters/repositories/chatmessage.repository";
import UserRepository from "../../adapters/repositories/user.repositories";
import ChatmessageUseCase from "../../application/usecases/chatmessage.usecase";

const Repositories = {
    ChatRepository: new ChatRepository(),
    UserRepository: new UserRepository(),
};

const useCase = {
    ChatmessageUseCase: new ChatmessageUseCase({ Repositories }),
};

const ChatmessageDependencies = useCase;

export default ChatmessageDependencies