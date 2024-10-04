import {
	pgTable,
	serial,
	text,
	doublePrecision,
	timestamp,
	integer,
	jsonb
} from 'drizzle-orm/pg-core'

export const locations = pgTable('locations', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	latitude: doublePrecision('latitude').notNull(),
	longitude: doublePrecision('longitude').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const savedLocations = pgTable('saved_locations', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	locationId: integer('location_id')
		.references(() => locations.id)
		.notNull(),
	title: text('title').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
})

export const weatherData = pgTable('weather_data', {
	id: serial('id').primaryKey(),
	locationId: integer('location_id')
		.references(() => locations.id)
		.notNull(),
	timestamp: timestamp('timestamp').notNull(),
	temperature: doublePrecision('temperature').notNull(),
	condition: text('condition').notNull(),
	humidity: integer('humidity').notNull(),
	windSpeed: doublePrecision('wind_speed').notNull(),
	forecast: jsonb('forecast').notNull()
})

export const pointsOfInterest = pgTable('points_of_interest', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(),
	address: text('address').notNull(),
	latitude: doublePrecision('latitude').notNull(),
	longitude: doublePrecision('longitude').notNull(),
	phone: text('phone'),
	website: text('website'),
	openingHours: text('opening_hours')
})
