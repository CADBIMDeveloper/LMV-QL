import { IBubbleNode, IDocumentNode } from "../../model";
import { loadSVF1Fragments, loadSVF2Fragments } from "./svfFragments";

export const createModel = async (doc: IDocumentNode, bubbleNode: IBubbleNode) => {
    const fragId2dbId = bubbleNode.isSVF2() ? await loadSVF2Fragments(doc, bubbleNode) : await loadSVF1Fragments(doc, bubbleNode);

    const modelData: ModelData = { loadOptions: { bubbleNode }, fragments: { fragId2dbId } };

    const model = new Autodesk.Viewing.Model(modelData);

    const propertyDbPath = bubbleNode.findPropertyDbPath();

    const loadProperties = () => {
        return new Promise(resolve => {
            const eventDispatcher = new Autodesk.Viewing.EventDispatcher();

            const propLoader = new Autodesk.Viewing.Private.PropDbLoader(propertyDbPath, model, eventDispatcher);

            eventDispatcher.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, () => resolve(propLoader));

            propLoader.load();
        })
    }

    const propLoader = await loadProperties();

    modelData.propDbLoader = propLoader;

    return model;
}

type ModelData = {
    [key: string]: any;
}