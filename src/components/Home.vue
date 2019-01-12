<template>
    <div class="home">
        <div class="filter">
            <el-radio-group v-model="$store.state.tasks.taskFilter">
                <el-radio-button label="pending">Pending</el-radio-button>
                <el-radio-button label="completed">Completed</el-radio-button>
                <el-radio-button label="archive">Archive</el-radio-button>
            </el-radio-group>
            <div>
                <el-button
                    v-on:click="create"
                    type="primary" circle>
                        <icon icon="plus"/>
                </el-button>
                <el-button
                    :disabled="taskFilter === 'archive'"
                    v-on:click="archive"
                    type="info" circle>
                        <icon icon="archive"/>
                </el-button>
                <el-button
                    class="delete"
                    v-on:click="remove"
                    type="danger" circle>
                        <icon icon="trash-alt"/>
                </el-button>
            </div>
        </div>
        <div>
            <el-input
                placeholder="Whats needs to be done?"
                @keyup.enter.native="create"
                v-model="task.name" />
            <div v-for="(task, key) in tasksFiltered" :key="key">
                <div v-on:click="select(task)">
                <el-card
                    :class="task.selected ? 'selected-card task-block': 'task-block'"
                    style="margin-top: 10px">
                    <el-checkbox
                        class="task-ckeckbox"
                        v-model="task.completed">
                            <span :class="task.completed ? 'completed-task-title' : ''">
                                {{task.name}}
                            </span>
                    </el-checkbox>
                    <el-badge
                        v-if="task.archived"
                        value="archived"
                        type="info"
                        class="item">
                    </el-badge>

                    <el-badge
                        v-else-if="task.completed"
                        value="completed"
                        type="success"
                        class="item">
                    </el-badge>

                    <el-badge
                        v-else
                        value="pending"
                        type="primary"
                        class="item">
                    </el-badge>
                </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as mutationTypes from '@/mutation-types';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    name: 'Home',
    computed: {
        ...mapState({
            task: ({tasks}) => tasks.task,
            tasks: ({tasks}) => tasks.tasks,
            taskFilter: ({tasks}) => tasks.taskFilter
        }),
        ...mapGetters([
            'tasksFiltered'
        ]),
        fullName () {
            return `${this.firstName} ${this.lastName}`;
        }
    },
    watch: {
        'taskFilter': function () {
            this.EDIT();
        }
    },
    methods: {
        ...mapMutations({...mutationTypes}),
        select (task) {
            task.selected = !task.selected;
        },
        archive () {
            this.ARCHIVE();
        },
        remove () {
            this.REMOVE();
        },
        create () {
            if (this.task.name) {
                this.ADD(this.task);
            }
        }
    }
};
</script>
