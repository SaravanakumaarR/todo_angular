export interface TodoModel {
id: number,
description: string,
status: TodoStatus
}

export enum TodoStatus {
    OPEN = 'open',
    CLOSED = 'done'
}