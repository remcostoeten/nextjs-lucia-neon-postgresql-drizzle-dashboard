import EnhancedCodeBlock from '@/components/elements/display-code/code-block'

export default function KanbanTutorial() {
	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-6">
				Kanban Bord Tutorial: Van A tot Z met Next.js 14, Server
				Actions, en Drizzle ORM
			</h1>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Inhoudsopgave</h2>
				<ol className="list-decimal list-inside">
					<li>
						<a
							href="#inleiding"
							className="text-blue-500 ophover:underline"
						>
							Inleiding
						</a>
					</li>
					<li>
						<a
							href="#projectopzet"
							className="text-blue-500 hover:underline"
						>
							Projectopzet
						</a>
					</li>
					<li>
						<a
							href="#database-configuratie"
							className="text-blue-500 hover:underline"
						>
							Database configuratie met Drizzle en Neon.tech
						</a>
					</li>
					<li>
						<a
							href="#server-side-rendering"
							className="text-blue-500 hover:underline"
						>
							Server-side rendering van het Kanban bord
						</a>
					</li>
					<li>
						<a
							href="#server-actions"
							className="text-blue-500 hover:underline"
						>
							Server actions voor CRUD operaties
						</a>
					</li>
					<li>
						<a
							href="#drag-and-drop"
							className="text-blue-500 hover:underline"
						>
							Drag-and-drop functionaliteit
						</a>
					</li>
					<li>
						<a
							href="#best-practices"
							className="text-blue-500 hover:underline"
						>
							Best practices en veelvoorkomende valkuilen
						</a>
					</li>
					<li>
						<a
							href="#conclusie"
							className="text-blue-500 hover:underline"
						>
							Conclusie
						</a>
					</li>
				</ol>
			</section>

			<section id="inleiding" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">1. Inleiding</h2>
				<p className="mb-4">
					In deze tutorial gaan we stap voor stap een Kanban bord
					bouwen met Next.js 14, waarbij we gebruik maken van
					server-side rendering, server actions, en Drizzle ORM met
					een PostgreSQL database (gehost op Neon.tech). We zullen
					focussen op best practices en het vermijden van
					veelvoorkomende valkuilen.
				</p>
			</section>

			<section id="projectopzet" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">2. Projectopzet</h2>
				<p className="mb-4">
					Laten we beginnen met het opzetten van ons Next.js project.
					Open je terminal en voer de volgende commando's uit:
				</p>
				<EnhancedCodeBlock
					code={`npx create-next-app@latest kanban-project
cd kanban-project
npm install @neon-tech/serverless pg drizzle-orm @auth/core @auth/drizzle-adapter
npm install -D drizzle-kit`}
					fileName="terminal"
					language="bash"
				/>
				<p className="mt-4">
					Dit zet ons Next.js project op en installeert de benodigde
					dependencies voor onze Kanban applicatie.
				</p>
			</section>

			<section id="database-configuratie" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					3. Database configuratie met Drizzle en Neon.tech
				</h2>
				<p className="mb-4">
					Nu gaan we onze database configureren met Drizzle ORM en
					Neon.tech. Eerst maken we een schema voor onze Kanban bord
					tabellen:
				</p>
				<EnhancedCodeBlock
					code={`import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const boards = pgTable('boards', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  boardId: serial('board_id').references(() => boards.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  columnId: serial('column_id').references(() => columns.id),
  createdAt: timestamp('created_at').defaultNow(),
});`}
					fileName="db/schema.ts"
					language="typescript"
				/>
				<p className="mt-4">
					Vervolgens maken we een bestand voor onze database
					connectie:
				</p>
				<EnhancedCodeBlock
					code={`import { neon } from '@neon-tech/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);`}
					fileName="db/index.ts"
					language="typescript"
				/>
				<p className="mt-4">
					Zorg ervoor dat je een .env bestand aanmaakt met je
					Neon.tech database URL:
				</p>
				<EnhancedCodeBlock
					code={`DATABASE_URL=your_neon_database_url_here`}
					fileName=".env"
					language="plaintext"
				/>
				<p className="mt-4">
					Tot slot, voer de migratie uit om de tabellen aan te maken:
				</p>
				<EnhancedCodeBlock
					code={`npx drizzle-kit push:pg`}
					fileName="terminal"
					language="bash"
				/>
			</section>

			<section id="server-side-rendering" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					4. Server-side rendering van het Kanban bord
				</h2>
				<p className="mb-4">
					Nu gaan we ons Kanban bord renderen met server-side
					rendering. Maak een nieuwe pagina aan:
				</p>
				<EnhancedCodeBlock
					code={`import { db } from '@/db';
import { boards, columns, tasks } from '@/db/schema';

export default async function KanbanBoard() {
  const boardData = await db.select().from(boards).limit(1);
  const board = boardData[0];

  if (!board) {
    return <div>Geen bord gevonden</div>;
  }

  const columnsData = await db.select().from(columns).where({ boardId: board.id });

  const tasksData = await db.select().from(tasks).where({
    columnId: { in: columnsData.map(col => col.id) }
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{board.name}</h1>
      <div className="flex space-x-4">
        {columnsData.map(column => (
          <div key={column.id} className="bg-gray-100 p-4 rounded-lg w-64">
            <h2 className="font-semibold mb-2">{column.name}</h2>
            {tasksData
              .filter(task => task.columnId === column.id)
              .map(task => (
                <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
                  {task.content}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}`}
					fileName="app/kanban/page.tsx"
					language="typescript"
				/>
				<p className="mt-4">
					Deze pagina haalt de board, columns en tasks op uit de
					database en rendert ze server-side.
				</p>
			</section>

			<section id="server-actions" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					5. Server actions voor CRUD operaties
				</h2>
				<p className="mb-4">
					Nu gaan we server actions implementeren voor het toevoegen
					en verwijderen van taken:
				</p>
				<EnhancedCodeBlock
					code={`import { db } from '@/db';
import { tasks } from '@/db/schema';

export async function addTask(columnId: number, content: string) {
  await db.insert(tasks).values({ columnId, content });
}

export async function deleteTask(taskId: number) {
  await db.delete(tasks).where({ id: taskId });
}

export async function moveTask(taskId: number, newColumnId: number) {
  await db.update(tasks).set({ columnId: newColumnId }).where({ id: taskId });
}`}
					fileName="app/actions.ts"
					language="typescript"
				/>
				<p className="mt-4">
					Nu kunnen we deze actions gebruiken in onze componenten:
				</p>
				<EnhancedCodeBlock
					code={`import { addTask, deleteTask } from './actions';

export function AddTaskForm({ columnId }: { columnId: number }) {
  return (
    <form action={async (formData: FormData) => {
      'use server';
      const content = formData.get('content') as string;
      await addTask(columnId, content);
    }}>
      <input name="content" placeholder="Nieuwe taak" required />
      <button type="submit">Toevoegen</button>
    </form>
  );
}

export function DeleteTaskButton({ taskId }: { taskId: number }) {
  return (
    <form action={async () => {
      'use server';
      await deleteTask(taskId);
    }}>
      <button type="submit">Verwijderen</button>
    </form>
  );
}`}
					fileName="app/components.tsx"
					language="typescript"
				/>
			</section>

			<section id="drag-and-drop" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					6. Drag-and-drop functionaliteit
				</h2>
				<p className="mb-4">
					Voor drag-and-drop functionaliteit kunnen we gebruik maken
					van de react-beautiful-dnd library. Installeer deze eerst:
				</p>
				<EnhancedCodeBlock
					code={`npm install react-beautiful-dnd`}
					fileName="terminal"
					language="bash"
				/>
				<p className="mt-4">
					Vervolgens passen we onze Kanban bord component aan:
				</p>
				<EnhancedCodeBlock
					code={`'use client';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveTask } from './actions';

export default function KanbanBoard({ initialData }) {
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      await moveTask(parseInt(draggableId), parseInt(destination.droppableId));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {initialData.columns.map(column => (
          <Droppable key={column.id} droppableId={column.id.toString()}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 p-4 rounded-lg w-64"
              >
                <h2 className="font-semibold mb-2">{column.name}</h2>
                {column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 mb-2 rounded shadow"
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}`}
					fileName="app/components/KanbanBoard.tsx"
					language="typescript"
				/>
				<p className="mt-4">
					Let op: deze component moet nu client-side gerenderd worden
					vanwege de interactieve drag-and-drop functionaliteit.
				</p>
			</section>

			<section id="best-practices" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					7. Best practices en veelvoorkomende valkuilen
				</h2>
				<ul className="list-disc list-inside space-y-2">
					<li>
						Gebruik server components waar mogelijk voor betere
						performance en SEO.
					</li>
					<li>
						Vermijd het gebruik van useEffect voor data fetching,
						gebruik in plaats daarvan server actions.
					</li>
					<li>
						Implementeer error handling en loading states voor een
						betere gebruikerservaring.
					</li>
					<li>
						Gebruik TypeScript voor type-veiligheid en betere code
						kwaliteit.
					</li>
					<li>
						Optimaliseer database queries om N+1 problemen te
						voorkomen.
					</li>
					<li>
						Implementeer authenticatie en autorisatie voor veilige
						toegang tot het Kanban bord.
					</li>
					<li>
						Gebruik React Suspense voor het laden van dynamische
						componenten.
					</li>
				</ul>
			</section>

			<section id="conclusie" className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">8. Conclusie</h2>
				<p>
					In deze tutorial hebben we een volledig functioneel Kanban
					bord gebouwd met Next.js 14, server-side rendering, server
					actions, en Drizzle ORM met een PostgreSQL database. We
					hebben geleerd hoe we efficiënt kunnen werken met de nieuwe
					App Router, hoe we server-side logica kunnen implementeren,
					en hoe we een soepele gebruikerservaring kunnen creëren met
					drag-and-drop functionaliteit.
				</p>
			</section>
		</div>
	)
}
