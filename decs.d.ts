declare namespace Autodesk {
    namespace Viewing {
        const OBJECT_TREE_CREATED_EVENT = 'objectTreeCreated';

        class Model implements IModel {
            constructor(data: object);
            getInstanceTree(): InstanceTree;
            getPropertyDb(): Private.PropDbLoader;
        }

        class InstanceTree {
            getRootId(): number;

            enumNodeChildren(node: number, callback: (dbId: number) => void | boolean, recursive?: boolean): void
        }

        class EventDispatcher {
            addEventListener(type: string, listener: (event: any) => void, options?: any): void;
        }

        class BubbleNode {
            isSVF2(): boolean;
            findPropertyDbPath(): string;
        }

        class Document {
            getFullPath(urn: string): string;
            getAcmSessionId(url: string): string | undefined;
        }

        namespace Private {
            class PropDbLoader {
                constructor(propertyDbPath: string, model: Model, eventDispatcher?: EventDispatcher);

                load(): void;

                executeUserFunction<TResult, TOptions>(code: ((pdb: PropertyDatabase, tag?: TOptions) => TResult) | string, tag?: TOptions): Promise<TResult>;
            }
        }
    }
}