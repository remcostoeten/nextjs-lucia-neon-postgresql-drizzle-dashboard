'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EnhancedCodeBlock from "@/components/elements/display-code/code-block"
import { CheckCircle2, Code2, Database, FileJson, FormInput, Server } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"         

type Section = 'intro' | 'packages' | 'db-connection' | 'schema' | 'zod-schema' | 'create-todo' | 'show-todo' | 'edit-todo' | 'recap-simple' | 'advanced-intro' | 'advanced-zod' | 'advanced-schema' | 'advanced-create' | 'advanced-display' | 'advanced-edit' | 'advanced-delete' | 'toasts' | 'preloaders' | 'optimistic-updates' | 'ssr-querying' | 'pagination' | 'filtering' | 'pitfalls' | 'solid' | 'tanstack' | 'error-handling';

export default function TodoPresentation() {
  const [activeSection, setActiveSection] = useState<Section>("intro")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      let current = ''
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.pageYOffset >= sectionTop - 60) {
          current = section.getAttribute('id') || ''
        }
      })
      setActiveSection(current as Section)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: Section) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections: Section[] = ['intro', 'packages', 'db-connection', 'schema', 'zod-schema', 'create-todo', 'show-todo', 'edit-todo', 'recap-simple', 'advanced-intro', 'advanced-zod', 'advanced-schema', 'advanced-create', 'advanced-display', 'advanced-edit', 'advanced-delete', 'toasts', 'preloaders', 'optimistic-updates', 'ssr-querying', 'pagination', 'filtering', 'pitfalls', 'solid', 'tanstack', 'error-handling'];

  return (
    <div className="flex">
      {!isMobile && (
        <nav className="w-64 h-screen overflow-y-auto fixed left-0 top-0 p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Inhoudsopgave</h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section}>
                <Button
                  onClick={() => scrollTo(section)}
                  variant={activeSection === section ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {section.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className={`container mx-auto p-4 space-y-8 ${!isMobile ? 'ml-64' : ''}`}>
        {isMobile && (
          <nav className="sticky top-0 bg-white z-10 p-4 border-b">
            <select
              onChange={(e) => scrollTo(e.target.value as Section)}
              value={activeSection}
              className="w-full p-2 border rounded"
            >
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </nav>
        )}

        <section id="intro">
          <h1 className="text-4xl font-bold text-center mb-8">Bouwen van een Geavanceerde To-Do App met Next.js, Drizzle ORM, en Server Actions</h1>
          <p className="text-lg mb-4">
            In deze presentatie gaan we stap voor stap door het proces van het bouwen van een geavanceerde To-Do applicatie.
            We beginnen met een eenvoudige implementatie en bouwen dit uit naar een meer complexe versie met geavanceerde functies.
          </p>
        </section>

        <section id="packages" className="space-y-4">
          <h2 className="text-2xl font-semibold">Benodigde Packages</h2>
          <p>Installeer de volgende packages om te beginnen:</p>
          <EnhancedCodeBlock
            code={`npm install next@latest react@latest react-dom@latest
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
npm install zod @hookform/resolvers react-hook-form
npm install @radix-ui/react-popover @radix-ui/react-dialog
npm install lucide-react date-fns
npm install @tanstack/react-query
npm install sonner`}
            fileName="terminal"
            language="bash"
            badges={["setup"]} />
        </section>

        <section id="db-connection" className="space-y-4">
          <h2 className="text-2xl font-semibold">Database Connectie</h2>
          <p>Configureer de connectie met de Neon Postgres database:</p>
          <EnhancedCodeBlock
            code={`import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);`}
            fileName="src/lib/db.ts"
            language="typescript"
            badges={["database", "neon", "drizzle"]} />
        </section>

        <section id="schema" className="space-y-4">
          <h2 className="text-2xl font-semibold">Database Schema</h2>
          <p>Definieer het schema voor de todo-tabel:</p>
          <EnhancedCodeBlock
            code={`import { pgTable, serial, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});`}
            fileName="src/db/schema.ts"
            language="typescript"
            badges={["database", "drizzle"]} />
        </section>

        <section id="zod-schema" className="space-y-4">
          <h2 className="text-2xl font-semibold">Zod Validatie Schema</h2>
          <p>Definieer een Zod schema voor het valideren van de todo input:</p>
          <EnhancedCodeBlock
            code={`import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be 255 characters or less'),
});`}
            fileName="src/lib/validations.ts"
            language="typescript"
            badges={["validation", "zod"]} />
        </section>

        <section id="create-todo" className="space-y-4">
          <h2 className="text-2xl font-semibold">Create Todo Action</h2>
          <p>Implementeer een server action om nieuwe todo's aan te maken:</p>
          <EnhancedCodeBlock
            code={`import { db } from '@/lib/db';
import { todos } from '@/db/schema';
import { todoSchema } from '@/lib/validations';

export async function createTodo(formData: FormData) {
  const result = todoSchema.safeParse({
    title: formData.get('title'),
  });
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  await db.insert(todos).values(result.data);
  return { success: true };
}`}
            fileName="src/app/actions/createTodo.ts"
            language="typescript"
            badges={["server-action", "drizzle"]} />
        </section>

        <section id="show-todo" className="space-y-4">
          <h2 className="text-2xl font-semibold">Show Todos Action</h2>
          <p>Implementeer een server action om todos op te halen:</p>
          <EnhancedCodeBlock
            code={`import { db } from '@/lib/db';
import { todos } from '@/db/schema';

export async function getTodos() {
  return await db.select().from(todos).orderBy(todos.createdAt);
}`}
            fileName="src/app/actions/getTodos.ts"
            language="typescript"
            badges={["server-action", "drizzle"]} />
        </section>

        <section id="edit-todo" className="space-y-4">
          <h2 className="text-2xl font-semibold">Edit Todo Action</h2>
          <p>Implementeer een server action om todos te bewerken:</p>
          <EnhancedCodeBlock
            code={`import { db } from '@/lib/db';
import { todos } from '@/db/schema';
import { todoSchema } from '@/lib/validations';
import { eq } from 'drizzle-orm';

export async function editTodo(id: number, formData: FormData) {
  const result = todoSchema.safeParse({
    title: formData.get('title'),
  });
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  await db.update(todos)
    .set(result.data)
    .where(eq(todos.id, id));
  
  return { success: true };
}`}
            fileName="src/app/actions/editTodo.ts"
            language="typescript"
            badges={["server-action", "drizzle"]} />
        </section>

        <section id="recap-simple" className="space-y-4">
          <h2 className="text-2xl font-semibold">Recap: Eenvoudige Todo Implementatie</h2>
          <p>
            We hebben nu de basis gelegd voor een eenvoudige Todo app met de volgende functionaliteiten:
            <ul className="list-disc list-inside">
              <li>Database connectie en schema definitie</li>
              <li>Zod validatie voor input</li>
              <li>Server actions voor het aanmaken, ophalen en bewerken van todos</li>
            </ul>
            In het volgende hoofdstuk gaan we deze basis uitbreiden met meer geavanceerde functies.
          </p>
        </section>

        <section id="advanced-intro" className="space-y-4">
          <h2 className="text-2xl font-semibold">Hoofdstuk 2: Geavanceerde Todo Implementatie</h2>
          <p>
            In dit hoofdstuk gaan we onze Todo app uitbreiden met meer geavanceerde functies, waaronder:
            <ul className="list-disc list-inside">
              <li>Uitgebreide todo-structuur met categorieën en extra attributen</li>
              <li>Geavanceerde formulieren met textarea en dropdown</li>
              <li>Relaties tussen tabellen</li>
              <li>Meer complexe server actions</li>
              <li>Geavanceerde UI-componenten voor het weergeven en bewerken van todos</li>
            </ul>
          </p>
        </section>

        <section id="advanced-zod" className="space-y-4">
          <h2 className="text-2xl font-semibold">Geavanceerd Zod Schema</h2>
          <p>Laten we ons Zod schema uitbreiden met meer velden:</p>
          <EnhancedCodeBlock
            code={`import { z } from 'zod';

export const advancedTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be 255 characters or less'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  category: z.enum(['work', 'personal', 'shopping', 'other']),
  priority: z.number().int().min(1).max(5),
  dueDate: z.string().datetime().optional(),
});`}
            fileName="src/lib/validations.ts"
            language="typescript"
            badges={["validation", "zod"]} />
        </section>

        <section id="advanced-schema" className="space-y-4">
          <h2 className="text-2xl font-semibold">Geavanceerd Database Schema</h2>
          <p>Laten we ons database schema uitbreiden met de nieuwe velden en een aparte tabel voor categorieën:</p>
          <EnhancedCodeBlock
            code={`import { pgTable, serial, varchar, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  completed: boolean('completed').default(false),
  categoryId: integer('category_id').references(() => categories.id),
  priority: integer('priority').notNull(),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow(),

});`}
            fileName="src/db/schema.ts"
            language="typescript"
            badges={["database", "drizzle"]} />
        </section>

        <section id="advanced-create" className="space-y-4">
          <h2 className="text-2xl font-semibold">Geavanceerde Create Todo Action</h2>
          <p>Implementeer een server action om nieuwe geavanceerde todo's aan te maken:</p>
          <EnhancedCodeBlock
            code={`import { db } from '@/lib/db';
import { todos, categories } from '@/db/schema';
import { advancedTodoSchema } from '@/lib/validations';
import { eq } from 'drizzle-orm';

export async function createAdvancedTodo(formData: FormData) {
  const result = advancedTodoSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    priority: Number(formData.get('priority')),
    dueDate: formData.get('dueDate'),
  });
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { category, ...todoData } = result.data;

  // Get or create category
  let categoryId;
  const existingCategory = await db.select().from(categories).where(eq(categories.name, category)).limit(1);
  if (existingCategory.length > 0) {
    categoryId = existingCategory[0].id;
  } else {
    const [newCategory] = await db.insert(categories).values({ name: category }).returning({ id: categories.id });
    categoryId = newCategory.id;
  }

  await db.insert(todos).values({ ...todoData, categoryId });
  return { success: true };
}`}
            fileName="src/app/actions/createAdvancedTodo.ts"
            language="typescript"
            badges={["server-action", "drizzle"]} />
        </section>

        <section id="advanced-display" className="space-y-4">
          <h2 className="text-2xl font-semibold">Geavanceerde Todo Weergave Component</h2>
          <p>Maak een React component om de geavanceerde todos weer te geven:</p>
          <EnhancedCodeBlock
            code={`import { getTodos } from '@/app/actions/getTodos';
import { format } from 'date-fns';

export default async function AdvancedTodoList() {
  const todos = await getTodos();

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div key={todo.id} className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          {todo.description && <p className="text-gray-600">{todo.description}</p>}
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>Priority: {todo.priority}</span>
            <span>Category: {todo.category.name}</span>
            {todo.dueDate && <span>Due: {format(new Date(todo.dueDate), 'PP')}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}`}
            fileName="src/components/AdvancedTodoList.tsx"
            language="tsx"
            badges={["react", "ssr"]} />
        </section>

        <section id="advanced-edit" className="space-y-4">
          <h2 className="text-2xl font-semibold">Geavanceerde Edit Todo Component</h2>
          <p>Maak een React component om geavanceerde todos te bewerken in een popover:</p>
          <EnhancedCodeBlock
            code={`import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { editAdvancedTodo } from '@/app/actions/editAdvancedTodo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { advancedTodoSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';

export function EditTodoPopover({ todo }) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(advancedTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      category: todo.category.name,
      priority: todo.priority,
      dueDate: todo.dueDate,
    },
  });

  const onSubmit = async (data) => {
    await editAdvancedTodo(todo.id, data);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input {...register('title')} id="title" />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea {...register('description')} id="description" />
            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select {...register('category')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Input {...register('priority', { valueAsNumber: true })} type="number" id="priority" min="1" max="5" />
            {errors.priority && <p className="text-sm text-red-600">{errors.priority.message}</p>}
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input {...register('dueDate')} type="datetime-local" id="dueDate" />
            {errors.dueDate && <p className="text-sm text-red-600">{errors.dueDate.message}</p>}
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}`}
            fileName="src/components/EditTodoPopover.tsx"
            language="tsx"
            badges={["react", "form", "popover"]} />
        </section>

        <section id="advanced-delete" className="space-y-4">
          <h2 className="text-2xl font-semibold">Geavanceerde Delete Todo Component</h2>
          <p>Maak een React component om todos te verwijderen met een bevestigingsdialoog:</p>
          <EnhancedCodeBlock
            code={`import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { deleteAdvancedTodo } from '@/app/actions/deleteAdvancedTodo';
import { Button } from '@/components/ui/button';

export function DeleteTodoDialog({ todoId, todoTitle }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await deleteAdvancedTodo(todoId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the todo "{todoTitle}"? This action cannot be undone.
        </DialogDescription>
        <div className="mt-4 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}`}
            fileName="src/components/DeleteTodoDialog.tsx"
            language="tsx"
            badges={["react", "dialog"]} />
        </section>

        <section id="toasts" className="space-y-4">
          <h2 className="text-2xl font-semibold">Toasts voor Gebruikersfeedback</h2>
          <p>Implementeer toasts voor server-side rendering feedback bij acties:</p>
          <EnhancedCodeBlock
            code={`import { toast } from 'sonner';

// In je server action
export async function createAdvancedTodo(formData: FormData) {
  try {
    // ... bestaande logica ...
    toast.success('Todo created successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to create todo:', error);
    toast.error('Failed to create todo. Please try again.');
    return { error: 'Failed to create todo' };
  }
}

// In je component
import { Toaster } from 'sonner';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}`}
            fileName="src/app/actions/createAdvancedTodo.ts"
            language="typescript"
            badges={["server-action", "toast"]} />
        </section>

        <section id="preloaders" className="space-y-4">
          <h2 className="text-2xl font-semibold">Server-Rendered Preloaders</h2>
          <p>Implementeer skeleton loaders voor server-side rendering:</p>
          <EnhancedCodeBlock
            code={`import { Skeleton } from "@/components/ui/skeleton"

export function TodoSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

// In je pagina component
import { Suspense } from 'react'
import { TodoSkeleton } from '@/components/TodoSkeleton'
import { AdvancedTodoList } from '@/components/AdvancedTodoList'

export default function TodoPage() {
  return (
    <Suspense fallback={<TodoSkeleton />}>
      <AdvancedTodoList />
    </Suspense>
  )
}`}
            fileName="src/components/TodoSkeleton.tsx"
            language="tsx"
            badges={["react", "skeleton"]} />
        </section>

        <section id="optimistic-updates" className="space-y-4">
          <h2 className="text-2xl font-semibold">Optimistic Updates</h2>
          <p>Implementeer optimistic updates voor een betere gebruikerservaring:</p>
          <EnhancedCodeBlock
            code={`import { useState } from 'react';
import { useOptimistic } from 'react';
import { deleteTodo } from '@/app/actions/deleteTodo';

export function TodoItem({ todo }) {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, newState) => ({ ...state, ...newState })
  );

  const handleDelete = async () => {
    setOptimisticTodo({ deleted: true });
    await deleteTodo(todo.id);
  };

  if (optimisticTodo.deleted) {
    return null;
  }

  return (
    <div>
      <h3>{optimisticTodo.title}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}`}
            fileName="src/components/TodoItem.tsx"
            language="tsx"
            badges={["react", "optimistic-update"]} />
        </section>

        <section id="ssr-querying" className="space-y-4">
          <h2 className="text-2xl font-semibold">SSR Querying zonder useEffect</h2>
          <p>Implementeer server-side rendering voor het ophalen van data zonder useEffect:</p>
          <EnhancedCodeBlock
            code={`// In je page.tsx
import { getTodos } from '@/app/actions/getTodos';
import { TodoList } from '@/components/TodoList';

export default async function TodoPage() {
  const todos = await getTodos();
  
  return <TodoList initialTodos={todos} />;
}

// In je TodoList.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/app/actions/getTodos';

export function TodoList({ initialTodos }) {
  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialData: initialTodos,
  });

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}`}
            fileName="src/app/todos/page.tsx"
            language="tsx"
            badges={["react", "ssr", "tanstack-query"]} />
        </section>

        <section id="pagination" className="space-y-4">
          <h2 className="text-2xl font-semibold">Paginatie</h2>
          <p>Implementeer paginatie voor het efficiënt laden van grote hoeveelheden todos:</p>
          <EnhancedCodeBlock
            code={`import { db } from '@/lib/db';
import { todos } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function getPaginatedTodos(page: number = 1, pageSize: number = 20) {
  const offset = (page - 1) * pageSize;
  
  const [todosList, totalCount] = await Promise.all([
    db.select().from(todos).limit(pageSize).offset(offset),
    db.select({ count: sql\`count(*)\` }).from(todos)
  ]);

  const totalPages = Math.ceil(totalCount[0].count / pageSize);

  return {
    todos: todosList,
    currentPage: page,
    totalPages,
    totalCount: totalCount[0].count
  };
}

// In je page component
export default async function TodoPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1;
    const { todos, currentPage, totalPages, totalCount } = await getPaginatedTodos(page);
    <section id="pagination" className="space-y-4">
          <h2 className="text-2xl font-semibold">Paginatie</h2>
          <p>Implementeer paginatie voor het efficiënt laden van grote hoeveelheden todos:</p>
          <EnhancedCodeBlock
            code={`import { db} from '@/lib/db';
          import {todos} from '@/db/schema';
          import {sql} from 'drizzle-orm';

          export async function getPaginatedTodos(page: number = 1, pageSize: number = 20) {
  const offset = (page - 1) * pageSize;

          const [todosList, totalCount] = await Promise.all([
          db.select().from(todos).limit(pageSize).offset(offset),
          db.select({count: sql\`count(*)\` }).from(todos)
          ]);

          const totalPages = Math.ceil(totalCount[0].count / pageSize);

          return {
            todos: todosList,
          currentPage: page,
          totalPages,
          totalCount: totalCount[0].count
  };
}

          // In je page component
          export default async function TodoPage({searchParams}: {searchParams: {page ?: string} }) {
  const page = Number(searchParams.page) || 1;
          const {todos, currentPage, totalPages, totalCount} = await getPaginatedTodos(page);

          return (
          <div>
            <h1>Todos (Total: {totalCount})</h1>
            <TodoList todos={todos} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
          );
}`}
          fileName="src/app/actions/getPaginatedTodos.ts"
          language="typescript"
          badges={["server-action", "pagination"]} />
        </section>

        <section id="filtering" className="space-y-4">
          <h2 className="text-2xl font-semibold">Filteren op Categorie</h2>
          <p>Implementeer filtering op categorie:</p>
          <EnhancedCodeBlock
            code={`import { db } from '@/lib/db';
import { todos, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getFilteredTodos(category?: string) {
  let query = db.select().from(todos).leftJoin(categories, eq(todos.categoryId, categories.id));
  
  if (category) {
    query = query.where(eq(categories.name, category));
  }

  return await query;
}

// In je page component
export default async function TodoPage({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;
  const todos = await getFilteredTodos(category);

  return (
    <div>
      <h1>Todos {category ? \`in \${category}\` : ''}</h1>
      <TodoList todos={todos} />
      <CategoryFilter />
    </div>
  );
}`}
            fileName="src/app/actions/getFilteredTodos.ts"
            language="typescript"
            badges={["server-action", "filtering"]} />
        </section>

        <section id="pitfalls" className="space-y-4">
          <h2 className="text-2xl font-semibold">Valkuilen en Best Practices</h2>
          <ul className="list-disc list-inside">
            <li>Wees voorzichtig met het gebruik van client-side state voor data die ook op de server wordt bijgehouden</li>
            <li>Overweeg het gebruik van caching strategieën om de belasting op je database te verminderen</li>
            <li>Zorg voor goede foutafhandeling en gebruikersfeedback</li>
            <li>Test je applicatie grondig, inclusief edge cases en foutscenario's</li>
          </ul>
        </section>

        <section id="solid" className="space-y-4">
          <h2 className="text-2xl font-semibold">SOLID Principes in React en Next.js</h2>
          <ul className="list-disc list-inside">
            <li>Single Responsibility: Houd componenten en functies gefocust op één taak</li>
            <li>Open-Closed: Gebruik compositie om functionaliteit uit te breiden zonder bestaande code te wijzigen</li>
            <li>Liskov Substitution: Zorg ervoor dat afgeleide componenten zich consistent gedragen met hun basiscomponenten</li>
            <li>Interface Segregation: Verdeel grote interfaces in kleinere, meer specifieke interfaces</li>
            <li>Dependency Inversion: Gebruik dependency injection en context voor het beheren van afhankelijkheden</li>
          </ul>
        </section>

        <section id="tanstack" className="space-y-4">
          <h2 className="text-2xl font-semibold">Wanneer React Query (TanStack Query) in te zetten</h2>
          <p>React Query is nuttig wanneer:</p>
          <ul className="list-disc list-inside">
            <li>Je complexe data fetching en caching nodig hebt</li>
            <li>Je wilt profiteren van automatische background refetching</li>
            <li>Je optimistic updates wilt implementeren</li>
            <li>Je server state wilt beheren los van client state</li>
            <li>Je wilt profiteren van ingebouwde loading en error states</li>
          </ul>
          <p>Voor eenvoudige use cases of wanneer je voornamelijk server-side rendering gebruikt, kan het gebruik van React Query overbodig zijn.</p>
        </section>

        <section id="error-handling" className="space-y-4">
          <h2 className="text-2xl font-semibold">Error Handling</h2>
          <p>Implementeer robuuste foutafhandeling in je applicatie:</p>
          <EnhancedCodeBlock
            code={`// In je server action
import { toast } from 'sonner';

export async function createTodo(formData: FormData) {
  try {
    // ... bestaande logica ...
    return { success: true };
  } catch (error) {
    console.error('Failed to create todo:', error);
    return { error: 'Failed to create todo. Please try again.' };
  }
}

// In je component
'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

export function CreateTodoForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    startTransition(async () => {
      const result = await createTodo(formData);
      if (result.success) {
        toast.success('Todo created successfully');
        // Reset form or update UI
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Todo'}
      </button>
    </form>
  );
}`}
            fileName="src/components/CreateTodoForm.tsx"
            language="tsx"
            badges={["react", "error-handling"]}
          />
        </section>
      </div>
    </div>
  )
}
