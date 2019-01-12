import Task from '@/types/Task';
import { ADD, EDIT, REMOVE, ARCHIVE } from '@/mutation-types';

export default {
    state: {
        tasks: [],
        taskFilter: 'pending',
        task: new Task()
    },
    getters: {
        tasksFiltered: state => {
            const tasks = state.tasks.filter(task => {
                switch (state.taskFilter) {
                case 'pending':
                    return !task.completed && !task.archived;
                case 'completed':
                    return task.completed && !task.archived;
                case 'archive':
                    return task.archived;
                }
            });
            return tasks;
        }
    },
    mutations: {
        [ADD] (state, data) {
            state.tasks.unshift(data);
            state.task = new Task();
        },
        [EDIT] (state) {
            state.tasks = state.tasks.map(task => {
                if (task.selected) {
                    task.selected = false;
                }
                return task;
            });
        },
        [REMOVE] (state) {
            state.tasks = state.tasks.filter(task => {
                return !task.selected;
            });
        },
        [ARCHIVE] (state) {
            state.tasks = state.tasks.map(task => {
                if (task.selected) task.archived = true;
                return task;
            });
        }
    }
};
