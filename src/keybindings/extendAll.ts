import { BlockUUID, ILSPluginUser } from '@logseq/libs/dist/LSPlugin';
import { debug, getCurrentBlockUUID, getSettings } from '../common/funcs';

const extend = async (blockUUID: BlockUUID | undefined) => {
  if (blockUUID) {
    try {
      await logseq.Editor.setBlockCollapsed(blockUUID, { flag: false });
    } catch (e) {}

    const block = await logseq.Editor.getBlock(blockUUID);

    if (block && block.children && block.children.length > 0) {
      for (let item of block.children) {
        if (Array.isArray(item) && item[0] === 'uuid') {
          await extend(item[1]);
        }
      }

    }
  }
};

export default (logseq: ILSPluginUser) => {
  const settings = getSettings();

  const bindings = Array.isArray(settings.extendAll) ? settings.extendAll : [settings.extendAll];

  bindings.forEach((binding, index) => {
    logseq.App.registerCommandPalette({
      key: 'vim-shortcut-extend-hierarchically-' + index,
      label: 'Extend block hierarchically',
      keybinding: {
        mode: 'non-editing',
        binding
      }
    }, async () => {
      debug('Extend block hierarchically');

      let blockUUID = await getCurrentBlockUUID();
      await extend(blockUUID);

    });
  });
};
