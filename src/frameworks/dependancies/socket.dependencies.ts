import ChatRepository from "../../adapters/repositories/chatmessage.repository";
import NotificationRepository from "../../adapters/repositories/notification.repository";
import SocketUseCase  from "../../application/usecases/socket.usecase";

const Repositories = {
    ChatRepository: new ChatRepository(),
    NotificationRepository: new NotificationRepository(),
};

const useCase = {
    SocketUseCase: new SocketUseCase({ Repositories }),
};

const SocketDependencies = useCase;

export default SocketDependencies