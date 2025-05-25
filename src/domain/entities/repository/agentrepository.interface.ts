import { ObjectId } from "mongoose";
import IAgent from "../model/agent.interface";

export default interface IAgentRepository {
  getAllAgenciesData(
    query: object,
    page: number,
    limit: number,
    filterData: object
  ): Promise<IAgent[] | null>;
  changeAgentStatus(id: ObjectId, is_block: boolean): Promise<IAgent | null>;
  getAgent(id: string): Promise<IAgent | null>;
  adminVerifyAgent(id: string, admin_verified: string): Promise<IAgent | null>;
  countAgencies(query: object, filterData: object): Promise<number>;
  findAgentByEmail(email: string): Promise<IAgent | null>;
  verifyAgent(email: string): Promise<IAgent | null>;
  changePassword(email: string, password: string): Promise<IAgent | null>;
  getAgent(userId: string): Promise<IAgent | null>;
  createAgent(agent: IAgent): Promise<IAgent>;
  findAgentByEmail(email: string): Promise<IAgent | null>;
  addRefreshToken(id: string | undefined, refreshToken: string): Promise<void>;
  verifyAgent(email: string): Promise<IAgent | null>;
  getAgent(agentId: string): Promise<IAgent | null>;
  updateAgent(agentId: string, agentData: IAgent): Promise<IAgent | null>;
  updatePassword(id: string, newPassword: string): Promise<IAgent | null>;
  getAllAgentCount(): Promise<{
    agentcount: number;
    unblockedagent: number;
  }>;
  unconfirmedagent(): Promise<IAgent[] | null>
  getAllagent(): Promise<IAgent[] | null>
}
