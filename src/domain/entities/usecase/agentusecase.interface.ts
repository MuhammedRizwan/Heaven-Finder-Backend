import IAgent from "../model/agent.interface";
import IOTP from "../model/otp.interface";

export interface AgentTokenResponse {
    agent: IAgent;
    accessToken: string;
    refreshToken: string;
}

export interface AgentDashboardData {
    packages: {
        packagecount: number;
        unblockedpackage: number;
    };
    booking: {
        totalbooking: number;
        completed: number;
        ongoing: number;
        pending: number;
        cancel: number;
    };
    bookingRevenue: number;
}

export interface AgentBarChartData {
    month: number;
    totalBookings: number;
    totalTransactions: number;
}

export default interface IAgentUseCase {
    signupAgent(agentData: IAgent, file: { Document: Express.Multer.File | undefined }): Promise<IAgent>;

    loginAgent(email: string, password: string): Promise<AgentTokenResponse>;

    getAgent(agentId: string): Promise<IAgent>;

    updateAgent(agentId: string, agentData: IAgent, file: Express.Multer.File | undefined): Promise<IAgent>;

    validatePassword(agentId: string, password: string): Promise<IAgent>;

    updatePassword(agentId: string, newPassword: string): Promise<IAgent>;

    getDashboard(agentId: string): Promise<AgentDashboardData>;

    getBarChart(agentId: string): Promise<AgentBarChartData[]>;

    refreshAccessToken(token: string): Promise<string>;

    OTPVerification(Otp: string, email: string): Promise<IAgent>;

    sendOTP(email: string): Promise<IOTP>;

    changePassword(email: string, password: string): Promise<IAgent>;
}
