class DataBase {
    // Manages data operations in local storage
    create(key, value, isReturn = false) {
        const user = this.get(key);
        if (!user) return { success: false, message: "User not found" };

        if (isReturn) {
            let taskIndex = -1;
            for (let i = 0; i < user.recycle.length; i++) {
                if (user.recycle[i].id == value) {
                    taskIndex = i;
                    break;
                }
            }
            if (taskIndex === -1) return { success: false, message: "Task not found in recycle" };
            value = user.recycle.splice(taskIndex, 1)[0];
        }
        value.id = user.tasks.length ? Math.max(...user.tasks.map(task => task.id)) + 1 : 0;
        user.tasks.push(value);
        this.set(key, user);
        return { success: true, data: value };
    }

    delete(key, value, isFinal = false) {
        const user = this.get(key);
        if (!user) return { success: false, message: "User not found" };

        if (isFinal) {
            let taskIndex = -1;
            for (let i = 0; i < user.recycle.length; i++) {
                if (user.recycle[i].id == value) {
                    taskIndex = i; break;
                }
            }
            if (taskIndex === -1) return { success: false, message: "Task not found in recycle" };
            user.recycle.splice(taskIndex, 1);
        } else {
            let taskIndex = -1;
            for (let i = 0; i < user.tasks.length; i++) {
                if (user.tasks[i].id == value) {
                    taskIndex = i; break;
                }
            }
            if (taskIndex === -1) return { success: false, message: "Task not found" };
            const removedTask = user.tasks.splice(taskIndex, 1)[0];
            removedTask.id = user.recycle.length ? Math.max(...user.recycle.map(task => task.id)) + 1 : 0;
            user.recycle.push(removedTask);
        }
        this.set(key, user);
        return { success: true, data: value };
    }

    update(key, value) {
        const user = this.get(key);
        if (!user) return { success: false, message: "User not found" };

        let taskIndex = -1;
        for (let i = 0; i < user.tasks.length; i++) {
            if (user.tasks[i].id == value) {
                taskIndex = i;
                break;
            }
        }
        if (taskIndex === -1) return { success: false, message: "Task not found" };
        user.tasks[taskIndex].done = !user.tasks[taskIndex].done;
        this.set(key, user);
        return { success: true };
    }

    read(key, isRecycle = false) {
        const user = this.get(key);
        if (!user) return { success: false, message: "User not found" };
        return { success: true, data: isRecycle ? user.recycle : user.tasks };
    }

    search(key, value) {
        const user = this.get(key);
        if (!user) return { success: false, message: "User not found" };

        const foundTasks = user.tasks.filter(task => task.value.title.toLowerCase().includes(value.toLowerCase()));
        if (foundTasks.length == 0) return { success: true, data: foundTasks, message: "search not found" };
        return { success: true, data: foundTasks };
    }

    done(key) {
        const user = this.get(key);
        if (!user) return { success: false, message: "User not found" };

        const foundTasks = user.tasks.filter(task => task.done == true);
        if (foundTasks.length == 0) return { success: true, data: foundTasks, message: "no tasks done" };
        return { success: true, data: foundTasks };
    }

    get(key) { return JSON.parse(localStorage.getItem(key)); }

    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
}