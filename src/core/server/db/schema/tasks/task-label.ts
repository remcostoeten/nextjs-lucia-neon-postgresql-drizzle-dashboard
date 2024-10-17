import { relations } from 'drizzle-orm'
import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { labels } from './label'
import { tasks } from './task'

export const taskLabels = pgTable('task_label', {
	taskId: uuid('task_id')
		.notNull()
		.references(() => tasks.id),
	labelId: uuid('label_id')
		.notNull()
		.references(() => labels.id)
})

export const taskLabelsRelations = relations(taskLabels, ({ one }) => ({
	task: one(tasks, {
		fields: [taskLabels.taskId],
		references: [tasks.id]
	}),
	label: one(labels, {
		fields: [taskLabels.labelId],
		references: [labels.id]
	})
}))
