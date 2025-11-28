import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 2048 }).notNull(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  clicks: integer("clicks").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  lastClicked: timestamp("last_clicked").default(new Date()), 
});


