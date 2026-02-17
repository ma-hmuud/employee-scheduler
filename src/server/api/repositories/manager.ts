import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { user as users } from "~/server/db/schema";

export const assignManagerDb = async (employeeId: number) => {
  return db
    .update(users)
    .set({
      role: "manager",
    })
    .where(eq(users.id, employeeId))
    .returning({
      id: users.id,
    })
    .then(res => res[0]);
};
