"use strict";

module.exports = class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;   // 总线程数目
        this.running = 0;                 // 当前运行线程数目
        this.queue = [];                  // 容纳线程的队列
    }

    pushTask(task) {
        this.queue.push(task);            // 队列中加入一个线程
        this.next();                      // 尝试执行一个任务
    }

    next() {

        // 小于当前任务最大限制，则从队列中取出一个任务
        while (this.running < this.concurrency && this.queue.length) {

            // 取出一个任务
            const task = this.queue.shift();

            //
            task().then(() => {
                this.running--;  // 一个任务执行完毕，则当前运行任务-1
                this.next();     // 尝试在队列中寻找任务
            });

            // 当前运行的任务数量+1
            this.running++;
        }
    }
};