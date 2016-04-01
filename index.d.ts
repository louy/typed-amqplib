import events = require("events");
import when = require("when");
import shared = require("./properties");
import callback_api = require("./callback_api");

export import Replies = shared.Replies;
export import Options = shared.Options;
export import Message = shared.Message;

export interface Connection extends events.EventEmitter {
    close(): when.Promise<void>;
    createChannel(): when.Promise<Channel>;
    createConfirmChannel(): when.Promise<Channel>;
}

export interface Channel extends events.EventEmitter {
    close(): when.Promise<void>;

    assertQueue(queue: string, options?: Options.AssertQueue): when.Promise<Replies.AssertQueue>;
    checkQueue(queue: string): when.Promise<Replies.AssertQueue>;

    deleteQueue(queue: string, options?: Options.DeleteQueue): when.Promise<Replies.DeleteQueue>;
    purgeQueue(queue: string): when.Promise<Replies.PurgeQueue>;

    bindQueue(queue: string, source: string, pattern: string, args?: any): when.Promise<Replies.Empty>;
    unbindQueue(queue: string, source: string, pattern: string, args?: any): when.Promise<Replies.Empty>;

    assertExchange(exchange: string, type: string, options?: Options.AssertExchange): when.Promise<Replies.AssertExchange>;
    checkExchange(exchange: string): when.Promise<Replies.Empty>;

    deleteExchange(exchange: string, options?: Options.DeleteExchange): when.Promise<Replies.Empty>;

    bindExchange(destination: string, source: string, pattern: string, args?: any): when.Promise<Replies.Empty>;
    unbindExchange(destination: string, source: string, pattern: string, args?: any): when.Promise<Replies.Empty>;

    publish(exchange: string, routingKey: string, content: Buffer, options?: Options.Publish): boolean;
    sendToQueue(queue: string, content: Buffer, options?: Options.Publish): boolean;

    consume(queue: string, onMessage: (msg: Message) => any, options?: Options.Consume): when.Promise<Replies.Consume>;

    cancel(consumerTag: string): when.Promise<Replies.Empty>;
    get(queue: string, options?: Options.Get): when.Promise<Message | boolean>;

    ack(message: Message, allUpTo?: boolean): void;
    ackAll(): void;

    nack(message: Message, allUpTo?: boolean, requeue?: boolean): void;
    nackAll(requeue?: boolean): void;
    reject(message: Message, requeue?: boolean): void;

    prefetch(count: number, global?: boolean): when.Promise<Replies.Empty>;
    recover(): when.Promise<Replies.Empty>;
}

export function connect(url: string, socketOptions?: any): when.Promise<Connection>;
