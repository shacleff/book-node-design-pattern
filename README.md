# node.js设计模式

## 运行版本要求
*   mac node 8.11.4

## 目录章节
### 第1章 欢迎来到Node.js平台
* Node．js 的哲学思想
* 小核心
* 小模块
* 小接触面
* 简单和实用
* 认识Node．js 6 和ES2015
* let 和const 关键字
* 箭头函数
* 类语法
* 增强的对象字面量
* Map 和Set 集合
* WeakMap 和WeakSet 集合
* 模板字面量
* 其他ES2015 特性
* Reactor 模式
* I/O 是缓慢的
* 阻塞I/O
* 非阻塞I/O
* 事件多路分解器
* Reactor 模式简介
* Node．js-libuv 的非阻塞I/O 引擎
* Node．js 的秘诀
* 总结
### 第2章 Node.js基础设计模式
* 回调模式
* CPS（Continuation Passing Style
* 同步或异步
* Node．js 回调约定
* 模块系统及其模式
* 揭示模块模式
* Node．js 模块解释
* 模块定义模式
* 观察者模式
* EventEmitter 类
* 创建和使用EventEmitter
* 传播错误
* 使任何对象可观察
* 同步和异步事件
* EventEmitter 与回调
* 组合回调和EventEmitter 
* 总结

### 第3章 异步控制流模式之回调函数
* 异步编程的困难
* 创建一个简单的网络蜘蛛
* 回调地狱
* 使用纯JavaScript
* 回调规则
* 应用回调规则
* 顺序执行
* 并行执行
* 有限制的并行执行
* async 库
* 顺序执行
* 并行执行
* 有限制的并行执行
* 总结
* xiv

### 第4章 异步控制流模式之ES2015+
* promise 
* 什么是promise 
* Promises/A+ 实现
* Node．js 风格函数的promise 化
* 顺序执行
* 并行执行
* 有限制的并行执行
* 在公共API 中暴露callback 和promise
* generator 
* generator 基础
* generator 的异步控制流
* 顺序执行
* 并行执行
* 有限制的并行执行
* 使用Babel 的async await
* 安装和运行Babel
* 比较
* 总结

### 第5章 流编程
* 流的重要性
* 缓冲和流
* 空间效率
* 时间效率
* 组合性
* 开始学习流
* 流的分类
* 可读流
* 可写流
* 双向流(Duplex stream)
* 变换流
* 使用管道拼接流
* 使用流处理异步流程
* 顺序执行
* 无序并行执行
* 无序有限制的并行执行
* 顺序并行执行
* xv
* 管道模式
* 组合流
* 复制流
* 合并流
* 复用和分解
* 总结

### 第6章 设计模式
* 工厂模式
* 创建对象的通用接口
* 一种封装的机制
* 构建一个简单的代码分析器
* 可组合的工厂函数
* 扩展
* 揭示构造函数
* 只读事件触发器
* 扩展
* 代理模式
* 实现代理模式的方法
* 不同方法的比较
* 创建日志记录的写入流
* 生态系统中的代理模式――函数钩子与面向行为编程(AOP)
* ES2015 中的Proxy 对象
* 扩展
* 装饰者模式(Decorator) 
* 实现装饰者模式的方法
* 装饰一个LevelUP 数据库
* 扩展
* 适配器模式(Adapter)
* 通过文件系统API 来使用LevelUP 数据库
* 扩展
* 策略模式(Strategy)
* 支持多种格式的配置对象
* 扩展
* 状态模式
* 实现一个基本的自动防故障套接字
* 模板模式(Template)
* 配置管理器模板
* xvi 
* 扩展
* 中间件(Middleware)
* Express 中的中间件
* 设计模式中的中间件
* 为ZMQ 创建中间件框架
* 在Koa 中使用生成器的中间件
* 命令模式(Command) 
* 灵活的设计模式
* 总结

### 第7章 连接模块
* 模块和依赖
* Node．js 中最常见的依赖
* 内聚和耦合
* 有状态的模块
* 连接模块模式
* 硬编码依赖
* 依赖注入
* 服务定位器
* 依赖注入容器
* 连接插件
* 插件作为包
* 扩展点
* 插件控制与应用程序控制的扩展
* 实现注销插件
* 总结

### 第8章 通用JavaScript的Web应用程序
* 与浏览器端共享代码
* 共享模块
* Webpack 简介
* Webpack 的魔力
* Webpack 的优点
* 使用ES2015 和Webpack
* 跨平台开发基础
* 运行时代码分支
* 构建时代码分支
* 模块交换
* xvii
* 用于跨平台开发的设计模式
* React 介绍
* 第一个React 组件
* JSX 是什么
* 配置Webpack 以实现JSX 转换
* 在浏览器中渲染
* React 路由库
* 创建通用JavaScript 应用程序
* 创建可用的组件
* 服务端渲染
* 通用渲染和路由
* 通用数据检索
* 总结

### 第9章 高级异步编程技巧
* 需要异步初始化的模块
* 规范解决方案
* 预初始化队列
* 题外话
* 异步批处理和缓存
* 实现没有缓存或批处理的服务器
* 异步请求批处理
* 异步请求缓存
* 使用promise 进行批处理和缓存
* 运行CPU 绑定的任务
* 解决子集和问题
* 交叉使用setImmediate
* 使用多进程
* 总结

### 第10章 扩展与架构模式
* 应用程序扩展介绍
* 扩展Node．js 应用程序
* 可扩展性的三个维度
* 克隆和负载均衡
* 集群模块
* 处理有状态通信
* 使用反向代理进行扩展
* xviii 
* 使用服务注册表
* 对等负载均衡
* 分解复杂的应用程序
* 单体式架构
* 微服务架构
* 微服务架构中的集成模式
* 总结

### 第11章 消息传递与集成模式
* 消息系统的基础
* 单向和请求/应答模式
* 消息类型
* 异步消息和队列
* 对等或基于代理的消息
* 发布/订阅模式
* 构建简约的实时聊天应用程序
* 使用Redis 作为消息代理
* 使用ZMQ 对等发布/订阅
* 持久订阅者
* 管道和任务分配模式
* MQ 扇出/扇入模式
* 使用AMQP 实现管道和竞争消费者模式
* 请求/应答模式
* 关联标识符
* 返回地址
* 总结
