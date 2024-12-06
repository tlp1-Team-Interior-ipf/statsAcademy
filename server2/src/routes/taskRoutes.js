import { Router } from 'express';
import { 
    createTaskController,
    deleteTaskController,
    getAllTasksController,
    updateTaskController,
} from '../controllers/taskController.js';

const taskRouter = Router();

taskRouter.post('/:id', createTaskController);
taskRouter.get('/:id', getAllTasksController);
taskRouter.put('/:id', updateTaskController);
taskRouter.delete('/:id', deleteTaskController);

export default taskRouter;