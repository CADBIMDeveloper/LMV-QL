import { IBubbleNode, IDocumentNode, IInstanceTree, IModel, IPropertyDatabase } from "../../model";
export declare const createModel: (doc: IDocumentNode, bubbleNode: IBubbleNode) => Promise<Autodesk.Viewing.Model>;
declare namespace Autodesk {
    namespace Viewing {
        const OBJECT_TREE_CREATED_EVENT = "objectTreeCreated";
        class Model implements IModel {
            constructor(data: object);
            getInstanceTree(): IInstanceTree;
            getPropertyDb(): IPropertyDatabase;
        }
        class EventDispatcher {
            addEventListener(type: string, listener: (event: any) => void, options?: any): void;
        }
        namespace Private {
            class PropDbLoader {
                constructor(propertyDbPath: string, model: Model, eventDispatcher?: EventDispatcher);
                load(): void;
            }
        }
    }
}
export {};
