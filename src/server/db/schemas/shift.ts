import { bigint, pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const shifts = pgTable("shifts", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  managerId: bigint("manager_id", { mode: "number" })
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  maxEmployees: integer("max_employees").notNull(),
  status: text("status").notNull().default("draft"), // draft | published | cancelled | filled
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const shiftRequests = pgTable("shift_requests", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  shiftId: bigint("shift_id", { mode: "number" })
    .references(() => shifts.id, { onDelete: "cascade" })
    .notNull(),
  employeeId: bigint("employee_id", { mode: "number" })
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status").notNull().default("pending"), // pending | approved | rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Relations
export const shiftRelations = relations(shifts, ({ one, many }) => ({
  manager: one(user, {
    fields: [shifts.managerId],
    references: [user.id],
  }),
  shiftRequests: many(shiftRequests),
}));

export const shiftRequestRelations = relations(shiftRequests, ({ one }) => ({
  shift: one(shifts, {
    fields: [shiftRequests.shiftId],
    references: [shifts.id],
  }),
  employee: one(user, {
    fields: [shiftRequests.employeeId],
    references: [user.id],
  }),
}));
