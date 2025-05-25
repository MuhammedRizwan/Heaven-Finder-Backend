import { ObjectId } from "mongoose";
import IAdmin from "../model/admin.interface";
import IAgent from "../model/agent.interface";
import IUser from "../model/user.interface";
import IWallet from "../model/wallet.interface";

export interface PaginatedResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export interface AuthResponse {
    admin: IAdmin;
    accessToken: string;
    refreshToken: string;
}

export interface BarChartData {
    month: number;
    totalBookings: number;
    totalTransactions: number;
}

export interface DashboardData {
    users: { usercount: number; unblockeduser: number; };
    agent: { agentcount: number; unblockedagent: number; };
    packages: { packagecount: number; blockedpackage: number; unblockedpackage: number; };
    bookings: { bookingcount: number; completedbooking: number; ongoingbooking: number; pendingbooking: number; cancelbooking: number; };
    revenue: IWallet;
    unconfirmedagency: IAgent[] | null;
}

export interface AgentBookingData{
    totalbooking: number;
    completed: number;
    ongoing: number;
    pending: number;
    cancel: number;
}


export default interface IAdminUseCase {
    loginAdmin(email: string, password: string): Promise<AuthResponse>;

    refreshAccessToken(token: string): Promise<string>;

    getAllUsers(
        search: string,
        page: number,
        limit: number,
        filter: string
    ): Promise<PaginatedResponse<IUser>>;

    changeUserStatus(id: ObjectId, is_block: boolean): Promise<IUser>;

    getAllAgencies(
        search: string,
        page: number,
        limit: number,
        filter: string
    ): Promise<PaginatedResponse<IAgent>>;

    changeAgentStatus(id: ObjectId, is_block: boolean): Promise<IAgent>;

    getAgent(id: string): Promise<IAgent>;

    adminVerifyAgent(id: string, admin_verified: string): Promise<IAgent>;

    getDashboardData(): Promise<DashboardData>;

    getAllAgents(): Promise<IAgent[]>;

    getAgentBookingData(agentId: string): Promise<AgentBookingData>;

    getBarChartData(): Promise<BarChartData[]>;
}

