import { createTRPCRouter } from "../trpc";
import { assignManagerProc } from "../procedures/manager";
import { shiftsRouter } from "./shifts";

export const managerRouter = createTRPCRouter({
  assignManager: assignManagerProc,
  shifts: shiftsRouter,
});
