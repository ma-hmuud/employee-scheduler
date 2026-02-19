import { createTRPCRouter } from "../trpc";
import { assignManagerProc } from "../procedures/manager";

export const managerRouter = createTRPCRouter({
  assignManager: assignManagerProc,
});
