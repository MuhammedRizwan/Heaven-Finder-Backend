import NotificationRepository from "../../adapters/repositories/notification.repository";
import NotificationUseCase from "../../application/usecases/notification.usecase";

const Repositories = {
    NotificationRepository: new NotificationRepository(),
};


const useCase = {
    NotificationUseCase: new NotificationUseCase({ Repositories}),
};

const NotificationDependencies = useCase;

export default NotificationDependencies