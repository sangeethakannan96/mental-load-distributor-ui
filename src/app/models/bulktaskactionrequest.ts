import { BulkTaskAction } from "./bulk-task-action";


export interface BulkTaskActionRequest {

  taskIds: string[];

  action: BulkTaskAction;

  assignedToId?: string;

  dueDate?: Date;
}