import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { tryCatch } from "~/lib/utils/try-catch";
import { assignManagerDb } from "../repositories/manager";

const managerProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const role = ctx.session?.user.role;
  if (role !== "manager") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next();
});

export const managerRouter = createTRPCRouter({
  assignManager: managerProcedure
    .input(
      z.object({
        employeeId: z
          .number("Employee ID must be a number")
          .min(1, "Employee ID must be a positive integer"),
      }),
    )
    .mutation(async ({ input }) => {
      // Logic to assign a manager to an employee
      const { employeeId } = input;
      const { data: updatedUser, error } = await tryCatch(
        assignManagerDb(employeeId),
      );
      if (error) {
        console.error("Error while assign manager:", error.message);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to assign manager. Please try again later.",
        });
      }

      if (!updatedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employee not found or could not be updated.",
        });
      }

      return { ok: true, data: updatedUser };
    }),
});
