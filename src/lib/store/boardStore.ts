import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
import type { Board, Task, Column, Label, FilterState, ViewSettings } from '@/types/board'
import { generateId } from '@/utils/id'

interface BoardState {
  // Data
  board: Board | null
  filters: FilterState
  viewSettings: ViewSettings

  // UI State
  selectedTaskId: string | null
  selectedColumnId: string | null
  isLoading: boolean
  error: string | null

  // Actions - Board
  setBoard: (board: Board) => void
  updateBoardTitle: (title: string) => void

  // Actions - Columns
  addColumn: (title: string) => void
  updateColumn: (columnId: string, updates: Partial<Column>) => void
  deleteColumn: (columnId: string) => void
  moveColumn: (columnId: string, newPosition: number) => void

  // Actions - Tasks
  addTask: (columnId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  moveTask: (taskId: string, targetColumnId: string, position: number) => void

  // Actions - Labels
  addLabel: (label: Omit<Label, 'id'>) => void
  updateLabel: (labelId: string, updates: Partial<Label>) => void
  deleteLabel: (labelId: string) => void

  // Actions - Filters & View
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
  setViewSettings: (settings: Partial<ViewSettings>) => void

  // Actions - UI
  selectTask: (taskId: string | null) => void
  selectColumn: (columnId: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getFilteredTasks: () => Task[]
  getTasksByColumn: (columnId: string) => Task[]
  getTaskById: (taskId: string) => Task | undefined
}

const defaultFilters: FilterState = {
  searchQuery: '',
  priorities: [],
  labelIds: [],
  showCompleted: true,
}

const defaultViewSettings: ViewSettings = {
  mode: 'board',
  sortBy: 'position',
  sortOrder: 'asc',
  showEmptyColumns: true,
  compactMode: false,
}

export const useBoardStore = create<BoardState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        board: null,
        filters: defaultFilters,
        viewSettings: defaultViewSettings,
        selectedTaskId: null,
        selectedColumnId: null,
        isLoading: false,
        error: null,

        // Board actions
        setBoard: (board) =>
          set((state) => {
            state.board = board
          }),

        updateBoardTitle: (title) =>
          set((state) => {
            if (state.board) {
              state.board.title = title
              state.board.updatedAt = new Date().toISOString()
            }
          }),

        // Column actions
        addColumn: (title) =>
          set((state) => {
            if (state.board) {
              const newColumn: Column = {
                id: generateId(),
                title,
                position: state.board.columns.length,
              }
              state.board.columns.push(newColumn)
              state.board.updatedAt = new Date().toISOString()
            }
          }),

        updateColumn: (columnId, updates) =>
          set((state) => {
            if (state.board) {
              const column = state.board.columns.find((c) => c.id === columnId)
              if (column) {
                Object.assign(column, updates)
                state.board.updatedAt = new Date().toISOString()
              }
            }
          }),

        deleteColumn: (columnId) =>
          set((state) => {
            if (state.board) {
              // Delete all tasks in column
              state.board.tasks = state.board.tasks.filter(
                (task) => task.columnId !== columnId
              )
              // Delete column
              state.board.columns = state.board.columns.filter(
                (col) => col.id !== columnId
              )
              // Update positions
              state.board.columns.forEach((col, index) => {
                col.position = index
              })
              state.board.updatedAt = new Date().toISOString()
            }
          }),

        moveColumn: (columnId, newPosition) =>
          set((state) => {
            if (state.board) {
              const columns = [...state.board.columns]
              const columnIndex = columns.findIndex((c) => c.id === columnId)
              if (columnIndex !== -1) {
                const [movedColumn] = columns.splice(columnIndex, 1)
                columns.splice(newPosition, 0, movedColumn)
                columns.forEach((col, index) => {
                  col.position = index
                })
                state.board.columns = columns
                state.board.updatedAt = new Date().toISOString()
              }
            }
          }),

        // Task actions
        addTask: (columnId, taskData) =>
          set((state) => {
            if (state.board) {
              const tasksInColumn = state.board.tasks.filter(
                (t) => t.columnId === columnId
              )
              const newTask: Task = {
                ...taskData,
                id: generateId(),
                columnId,
                position: tasksInColumn.length,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                attachments: [],
                comments: [],
              }
              state.board.tasks.push(newTask)
              state.board.updatedAt = new Date().toISOString()
            }
          }),

        updateTask: (taskId, updates) =>
          set((state) => {
            if (state.board) {
              const task = state.board.tasks.find((t) => t.id === taskId)
              if (task) {
                Object.assign(task, updates)
                task.updatedAt = new Date().toISOString()
                state.board.updatedAt = new Date().toISOString()
              }
            }
          }),

        deleteTask: (taskId) =>
          set((state) => {
            if (state.board) {
              const taskIndex = state.board.tasks.findIndex((t) => t.id === taskId)
              if (taskIndex !== -1) {
                const task = state.board.tasks[taskIndex]
                // Remove task
                state.board.tasks.splice(taskIndex, 1)
                // Update positions of remaining tasks in the same column
                state.board.tasks
                  .filter((t) => t.columnId === task.columnId)
                  .forEach((t, index) => {
                    t.position = index
                  })
                state.board.updatedAt = new Date().toISOString()
                // Clear selection if deleted task was selected
                if (state.selectedTaskId === taskId) {
                  state.selectedTaskId = null
                }
              }
            }
          }),

        moveTask: (taskId, targetColumnId, position) =>
          set((state) => {
            if (state.board) {
              const task = state.board.tasks.find((t) => t.id === taskId)
              if (task) {
                const oldColumnId = task.columnId

                // Update task
                task.columnId = targetColumnId
                task.position = position
                task.updatedAt = new Date().toISOString()

                // Reorder tasks in old column
                if (oldColumnId !== targetColumnId) {
                  state.board.tasks
                    .filter((t) => t.columnId === oldColumnId && t.id !== taskId)
                    .forEach((t, index) => {
                      t.position = index
                    })
                }

                // Reorder tasks in target column
                const tasksInTargetColumn = state.board.tasks
                  .filter((t) => t.columnId === targetColumnId)
                  .sort((a, b) => a.position - b.position)

                tasksInTargetColumn.forEach((t, index) => {
                  t.position = index
                })

                state.board.updatedAt = new Date().toISOString()
              }
            }
          }),

        // Label actions
        addLabel: (labelData) =>
          set((state) => {
            if (state.board) {
              const newLabel: Label = {
                ...labelData,
                id: generateId(),
              }
              state.board.labels.push(newLabel)
              state.board.updatedAt = new Date().toISOString()
            }
          }),

        updateLabel: (labelId, updates) =>
          set((state) => {
            if (state.board) {
              const label = state.board.labels.find((l) => l.id === labelId)
              if (label) {
                Object.assign(label, updates)
                state.board.updatedAt = new Date().toISOString()
              }
            }
          }),

        deleteLabel: (labelId) =>
          set((state) => {
            if (state.board) {
              // Remove label from board
              state.board.labels = state.board.labels.filter((l) => l.id !== labelId)
              // Remove label from all tasks
              state.board.tasks.forEach((task) => {
                task.labelIds = task.labelIds.filter((id) => id !== labelId)
              })
              state.board.updatedAt = new Date().toISOString()
            }
          }),

        // Filter & View actions
        setFilters: (filters) =>
          set((state) => {
            state.filters = { ...state.filters, ...filters }
          }),

        resetFilters: () =>
          set((state) => {
            state.filters = defaultFilters
          }),

        setViewSettings: (settings) =>
          set((state) => {
            state.viewSettings = { ...state.viewSettings, ...settings }
          }),

        // UI actions
        selectTask: (taskId) =>
          set((state) => {
            state.selectedTaskId = taskId
          }),

        selectColumn: (columnId) =>
          set((state) => {
            state.selectedColumnId = columnId
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),

        setError: (error) =>
          set((state) => {
            state.error = error
          }),

        // Computed getters
        getFilteredTasks: () => {
          const { board, filters } = get()
          if (!board) return []

          let tasks = board.tasks

          // Filter by search query
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase()
            tasks = tasks.filter(
              (task) =>
                task.title.toLowerCase().includes(query) ||
                task.description?.toLowerCase().includes(query)
            )
          }

          // Filter by priorities
          if (filters.priorities.length > 0) {
            tasks = tasks.filter((task) => filters.priorities.includes(task.priority))
          }

          // Filter by labels
          if (filters.labelIds.length > 0) {
            tasks = tasks.filter((task) =>
              task.labelIds.some((labelId) => filters.labelIds.includes(labelId))
            )
          }

          // Filter by completion status
          if (!filters.showCompleted) {
            tasks = tasks.filter((task) => !task.completed)
          }

          return tasks
        },

        getTasksByColumn: (columnId) => {
          const filteredTasks = get().getFilteredTasks()
          return filteredTasks
            .filter((task) => task.columnId === columnId)
            .sort((a, b) => a.position - b.position)
        },

        getTaskById: (taskId) => {
          const { board } = get()
          return board?.tasks.find((task) => task.id === taskId)
        },
      })),
      {
        name: 'flashy-board-store',
        partialize: (state) => ({
          board: state.board,
          viewSettings: state.viewSettings,
        }),
      }
    ),
    {
      name: 'flashy-board-store',
    }
  )
)