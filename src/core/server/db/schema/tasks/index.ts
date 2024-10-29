export * from './label'
export * from './task'
export * from './task-label'

import { relations } from 'drizzle-orm'
import { users } from '../auth'
import { labels } from './label'
import { tasks } from './task'

export const taskUsersRelations = relations(users, ({ many }) => ({
	tasks: many(tasks),
	labels: many(labels)
}))
